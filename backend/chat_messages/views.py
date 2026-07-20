from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from core.permissions import ReadOnly
from gateway import events as EVENTS
from gateway import opcodes as OPCODES
from rooms.models import Room
from servers.models import ServerMember
from servers.permissions import IsServerMember, IsServerOwner

from . import models, serializers
from .pagination import BeforeLimitPagination
from .permissions import IsMessageAuthor


class MessageRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.MessageSerializer
    queryset = models.Message.objects.all()

    perm_server_path = "room.server"
    permission_classes = [
        IsAuthenticated,
        IsServerOwner | IsMessageAuthor | IsServerMember & ReadOnly,
    ]

    def get_object(self):
        room = get_object_or_404(Room, pk=self.kwargs["room_pk"], is_deleted=False)
        message = get_object_or_404(
            models.Message.objects.select_related("author", "room"),
            room=room,
            pk=self.kwargs["msg_pk"],
            is_deleted=False,
        )

        self.check_object_permissions(self.request, message)

        return message

    def perform_update(self, serializer):
        message = self.get_object()
        serializer.save(edited_at=timezone.now())

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class MessageListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.MessageSerializer
    pagination_class = BeforeLimitPagination

    def get_queryset(self):
        room = get_object_or_404(Room, pk=self.kwargs["room_pk"], is_deleted=False)

        if room.server and not ServerMember.objects.filter(
            server=room.server, user=self.request.user
        ):
            raise PermissionDenied

        return models.Message.valid_objects.filter(room=room).select_related(
            "author", "room"
        )

    def perform_create(self, serializer):
        room = get_object_or_404(Room, pk=self.kwargs["room_pk"])

        if room.server and not ServerMember.objects.filter(
            server=room.server, user=self.request.user
        ):
            raise PermissionDenied

        message = serializer.save(room=room, author=self.request.user)

        nonce = serializer.validated_data.get("nonce")

        event_data = serializers.MessageSerializer(instance=message).data
        event_data["nonce"] = nonce

        group_name = f"room_{message.room.id}"
        channel_layer = get_channel_layer()

        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                "type": "dispatch_event",
                "opcode": OPCODES.DISPATCH,
                "data": event_data,
                "e_type": EVENTS.ROOM_MESSAGE_SEND,
            },
        )
