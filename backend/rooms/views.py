from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied
from . import models, serializers
from servers.permissions import IsServerOwnerOrMemberRetrieve


class RoomRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.RoomSerializer

    perm_server_path = 'server'
    permission_classes = [IsServerOwnerOrMemberRetrieve]

    def get_object(self):
        obj = get_object_or_404(models.Room, pk=self.kwargs['pk'], is_deleted=False)
        self.check_object_permissions(self.request, obj)
        return obj

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()
