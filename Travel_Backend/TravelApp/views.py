from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import generics
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import RegisterSerializer, LoginSerializer, HotelSerializer,GroupSerializer,ChatSerializer
from .models import *
from .pagination import HotelPagination
from .models import HotelReccomendation
import logging


@api_view(['POST', 'GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def chat_view(request, group_name=None):
    if request.method == "POST":
        data = request.data
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "GET" and group_name:
        try:
            group = ChatGroup.objects.get(group_name=group_name)
        except ChatGroup.DoesNotExist:
            return Response({'error': 'Group not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Ensure the user is a member of the group
        if not GroupMembership.objects.filter(group=group, user=request.user).exists():
            return Response({'error': 'You are not a member of this group'}, status=status.HTTP_403_FORBIDDEN)
        
        # Fetch and serialize the group messages
        messages = GroupMessage.objects.filter(group=group)
        serializer = ChatSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Create your views here.
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_group(request):
    if request.method == "GET":
        user = request.user
        # Filter groups where the user is a member
        groups = ChatGroup.objects.filter(members=user)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def join_group(request):
    group_id = request.data.get('group_id')
    user = request.user

    # Ensure group_id is provided
    if not group_id:
        return Response({'error': 'Group ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        group = ChatGroup.objects.get(id=group_id)

        # Check if user is already a member of the group
        if GroupMembership.objects.filter(group=group, user=user).exists():
            return Response({'error': 'You are already a member of this group.'}, status=status.HTTP_400_BAD_REQUEST)

        # Add user to the group with default role 'member'
        GroupMembership.objects.create(group=group, user=user, role='member')

        return Response({'message': f'You have successfully joined the group: {group.group_name}'}, status=status.HTTP_200_OK)

    except ChatGroup.DoesNotExist:
        return Response({'error': 'Group does not exist.'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_group(request):
    group_name = request.data.get('group_name')
    location = request.data.get('location')
    created_by = request.user  # Get the current authenticated user

    # Ensure all required data is provided
    if not group_name or not location:
        return Response({'error': 'Group name and location are required'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if the group already exists
    if ChatGroup.objects.filter(group_name=group_name).exists():
        return Response({'error': 'Group with this name already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Create the new group
    new_group = ChatGroup.objects.create(group_name=group_name, location=location, created_by=created_by)

    # Assign the creating user as the admin of the group
    GroupMembership.objects.create(group=new_group, user=created_by, role='admin')

    return Response({
        'id': new_group.id,
        'group_name': new_group.group_name,
        'location': new_group.location,
        'created_by': new_group.created_by.username,
        'created_on': new_group.created_on,
        'admin': created_by.username  # Indicate the admin of the group
    }, status=status.HTTP_201_CREATED)



@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def search_groups(request):
    location = request.data.get('location')

    # If no location or empty string is provided, return all groups
    if not location:
        groups = ChatGroup.objects.all()
    else:
        # Filter groups based on the provided location
        groups = ChatGroup.objects.filter(location__icontains=location)

    # Check if any groups exist and return data accordingly
    if groups.exists():
        group_data = [
            {
                'id': group.id,
                'group_name': group.group_name,
                'location': group.location,
                'created_by': group.created_by.username
            } for group in groups
        ]
        return Response(group_data, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'No groups found for this location'}, status=status.HTTP_404_NOT_FOUND)





logger = logging.getLogger(__name__)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_hotel_details(request, hotel_name):
    try:
        # Replace underscores with spaces
        hotel_name = hotel_name.replace("_", " ")
        
        # Fetch the hotel from the database
        hotel = HotelReccomendation.objects.filter(hotel_name=hotel_name)
        
        # Serialize the hotel data
        serializer = HotelSerializer(hotel[0], many=False)
        
        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except HotelReccomendation.DoesNotExist:
        # Return a 404 if the hotel is not found
        return Response({'error': 'Hotel not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        # Log the exception details
        logger.error(f"Error retrieving hotel: {str(e)}")
        
        # Return a 500 Internal Server Error with the exception message
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class HotelListView(APIView):
    pagination_class = HotelPagination  # Use the custom pagination class

    def get(self, request):  # sourcery skip: class-extract-method, use-named-expression
        # Fetch all objects initially, with optional city filter
        queryset = HotelReccomendation.objects.all()
        city = request.query_params.get('city', None)
        if city:
            queryset = queryset.filter(city__icontains=city)
        
        # Apply pagination
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = HotelSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)
    
    def post(self, request):
        # Fetch hotels based on search parameter, with pagination
        query = request.data.get('search', '')
        queryset = HotelReccomendation.objects.all()
        if query:
            queryset = queryset.filter(city__icontains=query)
        
        # Apply pagination for POST request as well
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)
        serializer = HotelSerializer(paginated_queryset, many=True)
        return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def current_user(request):
    
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username
    })

@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
class HotelRecommendationAPI(APIView):
    def get(self, request):
        data = request.data

        if data.get('city_name') is None:
            return Response({"error": "city name is missing"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            hotels = HotelReccomendation.objects.filter(city_name=data.get('city_name'))

            if not hotels.exists():
                return Response({"error": "No hotels found for the given city name"}, status=status.HTTP_404_NOT_FOUND)

            serializer = HotelSerializer(hotels, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

@permission_classes([AllowAny])
class LoginAPI(APIView):
    def post(self, request):
        try:
            data = request.data
            serializer = LoginSerializer(data=data)
            
            if serializer.is_valid():
                user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
                
                if not user:
                    return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

                # Create or get the token for the authenticated user
                token, _ = Token.objects.get_or_create(user=user)

                # Prepare response data with user details and token
                response_data = {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "token": str(token)
                }

                return Response(response_data, status=status.HTTP_202_ACCEPTED)
            
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response({"error": "An unexpected error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@permission_classes([AllowAny])
class RegisterAPI(APIView):
     
    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data=data)
        if not serializer.is_valid():
            return Response({
                'status': False,
                'message': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        # Generate token for the user
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            'status': True,
            'message': 'User created',
            'id': user.id,
            'token': token.key  # Include the token in the response
        }, status=status.HTTP_201_CREATED)
