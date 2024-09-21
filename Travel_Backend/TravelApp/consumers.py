from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json
from .models import ChatGroup, GroupMessage
from django.contrib.auth.models import User

class ChatroomConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        author = User.objects.get(username=text_data_json['author'])

        # Save message to the database
        chat_group = ChatGroup.objects.get(group_name=self.room_name)
        group_message = GroupMessage.objects.create(
            group=chat_group,
            author=author,
            body=message
        )

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'author': author.username
            }
        )

    def chat_message(self, event):
        message = event['message']
        author = event['author']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'author': author
        }))
