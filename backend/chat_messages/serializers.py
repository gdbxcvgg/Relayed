from rest_framework import serializers
from users.serializers import UserSerializer
from . import models


class MessageSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    author = UserSerializer(read_only=True)
    room_id = serializers.UUIDField(read_only=True, source='room.id')
    created_at = serializers.DateTimeField(read_only=True)
    edited_at = serializers.DateTimeField(read_only=True)


    class Meta:
        model = models.Message 
        fields = ['id', 'content', 'author', 'room_id', 'created_at', 'edited_at']