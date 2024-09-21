from TravelApp.views import RegisterAPI, LoginAPI, HotelListView, get_hotel_details, current_user, create_group, search_groups,join_group,get_group,chat_view
from django.urls import path

urlpatterns = [
    path('register/', RegisterAPI.as_view()),
    path('login/', LoginAPI.as_view()),
    path('currentuser/', current_user),
    path('hotels/', HotelListView.as_view(), name='hotel-list'),
    path('hotels/<str:hotel_name>/', get_hotel_details, name='hotel-list'),
    path('addgroup/', create_group, name='create-group'),  # Add group creation
    path('searchgroups/', search_groups, name='search-groups'),  # Search for groups
    path('joingroup/', join_group, name='join-group'),  # join group
    path('getgroups/', get_group, name='get-groups'),  # get groups
    path('chat/<str:group_name>/',chat_view)
]
