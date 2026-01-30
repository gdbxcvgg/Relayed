from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rooms.models import Room
from . import models, serializers
from servers.models import ServerMember


class MessageRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.MessageSerializer
    queryset = models.Message.objects.all()

    def get_object(self):
        room = get_object_or_404(Room, pk=self.kwargs['room_pk'])
        message = get_object_or_404(models.Message, room=room, pk=self.kwargs['msg_pk'])

        return message


    def perform_update(self, serializer):
        message = self.get_object()

        if message.author != self.request.user:
            raise PermissionDenied
        
        serializer.save(edited_at=timezone.now())


class MessageListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.MessageSerializer

    def get_queryset(self):
        room = get_object_or_404(Room, pk=self.kwargs['room_pk'])

        if room.server and not ServerMember.objects.filter(server=room.server, user=self.request.user):
            raise PermissionDenied

        return models.Message.objects.filter(room=room)

    def perform_create(self, serializer):
        room = get_object_or_404(Room, pk=self.kwargs['room_pk'])
        
        if room.server and not ServerMember.objects.filter(server=room.server, user=self.request.user):
            raise PermissionDenied
        
        serializer.save(room=room, author=self.request.user)