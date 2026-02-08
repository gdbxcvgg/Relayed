from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rooms.models import Room
from . import models, serializers
from servers.models import ServerMember
from servers.permissions import IsServerOwner, IsServerMember
from core.permissions import ReadOnly
from rest_framework.permissions import IsAuthenticated
from .permissions import IsMessageAuthor


class MessageRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.MessageSerializer
    queryset = models.Message.objects.all()

    perm_server_path = 'room.server'
    permission_classes = [IsAuthenticated, IsServerOwner | IsMessageAuthor | IsServerMember & ReadOnly]

    def get_object(self):
        room = get_object_or_404(Room, pk=self.kwargs['room_pk'], is_deleted=False)
        message = get_object_or_404(models.Message, room=room, pk=self.kwargs['msg_pk'], is_deleted=False)

        return message

    def perform_update(self, serializer):
        message = self.get_object()
        serializer.save(edited_at=timezone.now())

    def perform_destroy(self, instance):      
        instance.is_deleted = True
        instance.save()


class MessageListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.MessageSerializer

    def get_queryset(self):
        room = get_object_or_404(Room, pk=self.kwargs['room_pk'], is_deleted=False)

        if room.server and not ServerMember.objects.filter(server=room.server, user=self.request.user):
            raise PermissionDenied

        return models.Message.valid_objects.filter(room=room)

    def perform_create(self, serializer):
        room = get_object_or_404(Room, pk=self.kwargs['room_pk'])
        
        if room.server and not ServerMember.objects.filter(server=room.server, user=self.request.user):
            raise PermissionDenied
        
        serializer.save(room=room, author=self.request.user)