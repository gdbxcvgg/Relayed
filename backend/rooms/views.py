from django.contrib.auth import get_user_model
from django.db.models import Count
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.permissions import ReadOnly
from servers.permissions import IsServerMember, IsServerOwner

from . import models, serializers

User = get_user_model()


class RoomRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.RoomSerializer
    queryset = models.Room.objects.select_related("server")

    perm_server_path = "server"
    permission_classes = [IsAuthenticated, IsServerOwner | IsServerMember & ReadOnly]

    def get_object(self):
        qs = self.get_queryset()
        obj = get_object_or_404(qs, pk=self.kwargs["pk"], is_deleted=False)
        self.check_object_permissions(self.request, obj)
        return obj

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()


class DMRoomListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.DMRoomSerializer

    def get_queryset(self):
        user = self.request.user

        qs = models.Room.objects.prefetch_related("recipients")
        return qs.annotate(num_recipients=Count("recipients", distinct=True)).filter(
            room_type=models.Room.TypeChoices.DM, recipients=user
        )

    def perform_create(self, serializer):
        room = serializer.save(room_type=models.Room.TypeChoices.DM)
        room.recipients.add(self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.request.user

        recipients = serializer.validated_data["recipients"]
        recipients_count = len(recipients)

        if recipients_count <= 0:
            return Response(
                {"detail": "You need to specify the user you want to create DM with."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user in recipients:
            return Response(
                {"detail": "You cannot create a DM with yourself."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        qs = self.get_queryset()

        existing_room = (
            qs.filter(recipients=recipients[0]).filter(num_recipients=2).first()
        )

        if recipients_count == 1 and existing_room:
            data = self.get_serializer(existing_room).data
            return Response(data, status=status.HTTP_200_OK)

        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )
