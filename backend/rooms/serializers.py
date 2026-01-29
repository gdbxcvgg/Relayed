from rest_framework import serializers
from servers.serializers import PartialServerSerializer
from . import models


class RoomSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = models.Room
        fields = ['id', 'name', 'description', 'room_type', 'parent', 'created_at']