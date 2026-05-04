from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from . import models, serializers
from servers.permissions import IsServerOwner, IsServerMember
from core.permissions import ReadOnly


class RoomRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.RoomSerializer
    queryset = models.Room.objects.select_related('server')

    perm_server_path = 'server'
    permission_classes = [IsAuthenticated, IsServerOwner | IsServerMember & ReadOnly]

    def get_object(self):
        qs = self.get_queryset()
        obj = get_object_or_404(qs, pk=self.kwargs['pk'], is_deleted=False)
        self.check_object_permissions(self.request, obj)
        return obj

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
