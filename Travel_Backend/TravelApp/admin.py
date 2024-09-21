from django.contrib import admin
from .models import ChatGroup,GroupMembership

# Register your models here.
admin.site.register(ChatGroup)
admin.site.register(GroupMembership)