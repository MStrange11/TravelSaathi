from rest_framework import serializers
from django.contrib.auth.models import User
from .models import HotelReccomendation,ChatGroup,GroupMessage


class ChatSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = GroupMessage
        fields = ['id','author', 'author_username', 'body', 'created']
        
class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = HotelReccomendation
        fields = '__all__'  # Or specify fields explicitly



class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = ['group_name', 'members']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    token = serializers.CharField(read_only=True)
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField(read_only=True)
    first_name = serializers.CharField(max_length=100, read_only=True)
    last_name = serializers.CharField(max_length=100, read_only=True)


class RegisterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)

    def validate(self, data):
# sourcery skip: merge-nested-ifs
        if data['username']:
            if User.objects.filter(username=data['username']).exists():
                raise serializers.ValidationError("Username already taken")

        if data['email']:
            if User.objects.filter(email=data['email']).exists():
                raise serializers.ValidationError("email already taken")
        return data

    def create(self, validate_data):
        user = User.objects.create(username=validate_data['username'], email=validate_data['email'],
                                   first_name=validate_data['first_name'], last_name=validate_data['last_name'])
        user.set_password(validate_data['password'])
        user.save()
        return user
