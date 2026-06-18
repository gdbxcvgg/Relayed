from rest_framework import serializers
from servers.serializers import ServerSerializer
from . import models
from users.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class RoomSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    server_id = serializers.CharField(read_only=True, source="server.id")

    class Meta:
        model = models.Room
        fields = [
            "id",
            "name",
            "description",
            "room_type",
            "parent",
            "created_at",
            "server_id",
        ]

    def get_fields(self):
        fields = super().get_fields()

        if self.instance:
            fields["room_type"].read_only = True

        return fields


class ParialRoomSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    parent = serializers.UUIDField(read_only=True, source="parent.id", default=None)
    server_id = serializers.CharField(read_only=True, source="server.id")

    class Meta:
        model = models.Room
        fields = [
            "id",
            "name",
            "description",
            "room_type",
            "parent",
            "created_at",
            "server_id",
        ]


class RoomDeletedSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    server_id = serializers.UUIDField(read_only=True, source="server.id", default=None)

    class Meta:
        model = models.Room
        fields = ["id", "server_id"]


class DMRoomSerializer(serializers.ModelSerializer):
    recipients = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, many=True
    )

    class Meta:
        model = models.Room
        fields = ["id", "recipients", "room_type"]

        read_only_fields = ["id", "room_type"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        user = self.context["request"].user

        representation["recipients"] = UserSerializer(
            instance.recipients.exclude(id=user.id), many=True
        ).data

        return representation
