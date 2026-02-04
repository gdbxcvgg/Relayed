from rest_framework import serializers
from servers.serializers import PartialServerSerializer
from . import models


class RoomSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = models.Room
        fields = ['id', 'name', 'description', 'room_type', 'parent', 'created_at']


class ParialRoomSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    parent_id = serializers.UUIDField(read_only=True, source='parent.id', default=None)

    class Meta:
        model = models.Room
        fields = ['id', 'name', 'description', 'room_type', 'parent_id', 'created_at']

    
class RoomDeletedSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    server_id = serializers.UUIDField(read_only=True, source='server.id', default=None)

    class Meta:
        model = models.Room 
        fields = ['id', 'server_id']