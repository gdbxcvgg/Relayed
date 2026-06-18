from rest_framework import serializers
from users.serializers import UserSerializer
from . import models


class MessageSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    author = UserSerializer(read_only=True)
    room_id = serializers.UUIDField(read_only=True, source="room.id")
    created_at = serializers.DateTimeField(read_only=True)
    edited_at = serializers.DateTimeField(read_only=True)
    nonce = serializers.CharField(write_only=True)

    class Meta:
        model = models.Message
        fields = [
            "id",
            "content",
            "author",
            "room_id",
            "created_at",
            "edited_at",
            "nonce",
        ]

    def create(self, validated_data):
        validated_data.pop("nonce", None)
        return super().create(validated_data)


class MessageDeletedSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    room_id = serializers.UUIDField(read_only=True, source="room.id")

    class Meta:
        model = models.Message
        fields = ["id", "room_id"]
