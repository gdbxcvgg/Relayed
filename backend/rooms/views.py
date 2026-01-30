from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from . import models, serializers


class RoomRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.RoomSerializer

    def get_object(self):
        return get_object_or_404(models.Room, pk=self.kwargs['pk'], is_deleted=False)

    
    def perform_update(self, serializer):
        room = self.get_object()
        server = room.server

        if server and server.owner != self.request.user:
            raise PermissionDenied
        
        serializer.save()

    def perform_destroy(self, instance):
        room = self.get_object()
        server = room.server
        if server and server.owner != self.request.user:
            raise PermissionDenied
        
        instance.is_deleted = True
        instance.save()
        

