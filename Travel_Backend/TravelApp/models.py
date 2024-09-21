from django.db import models
from django.contrib.auth.models import User

def default_preferences():
    return {"location": []}

def default_selected_users():
    return {"users":[]}

# Create your models here.
# user_realted_models

#
class UserProfile(models.Model):
    user = models.ForeignKey(User , on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to="profile_pictures" , blank=True , null=True)
    bio = models.CharField(max_length=200,null=True,blank=True)
    preferences = models.JSONField(default=default_preferences)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# class Friends(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('accepted', 'Accepted'),
#         ('blocked', 'Blocked'),
#     ]

#     user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="user")
#     friend = models.ForeignKey(User, on_delete=models.CASCADE,related_name="friend")
#     status = models.CharField(max_length=10,choices=STATUS_CHOICES,default="pending")
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

 
# class UsersRatings(models.Model):
#     rater = models.ForeignKey(User,on_delete=models.CASCADE,related_name="rater")
#     ratee = models.ForeignKey(User,on_delete=models.CASCADE,related_name="ratee")
#     rating = models.DecimalField(max_digits=2,decimal_places=1)
#     review = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)



# Hotel_related_models

#
class HotelReccomendation(models.Model):
    country_name = models.CharField(max_length=1000)
    city_name = models.CharField(max_length=1000)
    hotel_name = models.CharField(max_length=1000)
    hotel_rating = models.IntegerField(default=0)
    address = models.CharField(max_length=1000, null=True, blank=True)#
    attractions = models.TextField(default='', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    hotel_facilities = models.TextField(null=True, blank=True)
    lan_log = models.CharField(max_length=1000, null=True, blank=True)#
    phone_number = models.CharField(max_length=1000,default='', null=True, blank=True)

    def __str__(self):
        return str(self.hotel_name)



# chat_related_models

#
class ChatGroup(models.Model):
    group_name = models.CharField(max_length=128, unique=True)
    created_by = models.ForeignKey(User, related_name='created_groups', on_delete=models.SET_NULL, null=True)
    location = models.CharField(max_length=100)
    created_on = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(User, related_name='chat_groups', through='GroupMembership')

    def __str__(self) -> str:
        return self.group_name
    

class GroupMembership(models.Model):
    group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[('admin', 'Admin'), ('member', 'Member')], default='member')
    joined_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Group: {self.group.group_name}, User: {self.user.username}, Role: {self.role}"


#
class GroupMessage(models.Model):
    group = models.ForeignKey(ChatGroup, related_name='chat_messages', on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=300)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.author.username} : {self.body}'

    class Meta:
        ordering = ['-created']

# class Notifications(models.Model): # ON HOLD !!!!!!
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     message = models.ForeignKey(GroupMessage,on_delete=models.CASCADE)
#     read = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)