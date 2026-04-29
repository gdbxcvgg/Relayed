from rest_framework import serializers
from servers.serializers import ServerSerializer
from . import models


class RoomSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    server_id = serializers.CharField(read_only=True, source='server.id')

    class Meta:
        model = models.Room
        fields = ['id', 'name', 'description', 'room_type', 'parent', 'created_at', 'server_id']

    def get_fields(self):
        fields = super().get_fields()

        if self.instance:
            fields['room_type'].read_only = True

        return fields

class ParialRoomSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    parent = serializers.UUIDField(read_only=True, source='parent.id', default=None)
    server_id = serializers.CharField(read_only=True, source='server.id')

    class Meta:
        model = models.Room
        fields = ['id', 'name', 'description', 'room_type', 'parent', 'created_at', 'server_id']

    
class RoomDeletedSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    server_id = serializers.UUIDField(read_only=True, source='server.id', default=None)

    class Meta:
        model = models.Room 
        fields = ['id', 'server_id']