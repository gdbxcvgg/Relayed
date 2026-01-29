from rest_framework import generics
from . import models, serializers
from rooms.serializers import RoomSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied


class ServerRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.ServerSerializer

    def get_queryset(self):
        return models.Server.objects.filter(servermember__user=self.request.user)

    def perform_update(self, serializer):
        server = self.get_object()
        if server.owner != self.request.user:
            raise PermissionDenied

        super().perform_update(serializer)


class ServerRoomsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        from rooms.models import Room

        server = get_object_or_404(models.Server, pk=self.kwargs['pk'])
        
        if not models.ServerMember.objects.filter(server=server, user=self.request.user):
            raise PermissionDenied

        return Room.objects.filter(server=server)

    def perform_create(self, serializer):
        server = get_object_or_404(models.Server, pk=self.kwargs['pk'])
        if server.owner != self.request.user:
            raise PermissionDenied
        
        serializer.save(server=server)