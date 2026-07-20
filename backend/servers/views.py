from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, mixins, response, status, views
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated

from core.permissions import ReadOnly
from rooms.models import Room
from rooms.serializers import RoomSerializer

from . import models, serializers
from .permissions import IsServerMember, IsServerOwner


class ServerRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.ServerSerializer
    queryset = models.Server.objects.select_related("owner")

    perm_server_path = "self"
    permission_classes = [IsAuthenticated, IsServerOwner | IsServerMember & ReadOnly]

    def perform_destroy(self, instance):
        instance.is_deleted = True

        members = models.ServerMember.objects.filter(server=instance)

        for member in members:
            member.delete()

        instance.save()


class ServerRoomsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RoomSerializer

    perm_server_kwargs = "pk"
    perm_server_path = "server"
    permission_classes = [IsAuthenticated, IsServerOwner | IsServerMember & ReadOnly]

    def get_queryset(self):
        server = get_object_or_404(
            models.Server, pk=self.kwargs["pk"], is_deleted=False
        )
        return Room.objects.filter(server=server, is_deleted=False).select_related(
            "server"
        )

    def perform_create(self, serializer):
        server = get_object_or_404(
            models.Server, pk=self.kwargs["pk"], is_deleted=False
        )
        if server.owner != self.request.user:
            raise PermissionDenied

        serializer.save(server=server)


class ServerInviteRetrieveJoinServerAPIView(
    generics.RetrieveAPIView, mixins.CreateModelMixin
):
    serializer_class = serializers.ServerInviteSerializer

    def get_object(self):
        invite_code = self.kwargs["invite_code"]
        invite = get_object_or_404(
            models.ServerInvite.objects.select_related("inviter", "server"),
            code=invite_code,
            is_deleted=False,
        )

        if invite.is_expired:
            raise Http404

        return invite

    # Join Server
    def post(self, request, *args, **kwargs):
        invite = self.get_object()

        if models.ServerBan.objects.filter(
            server=invite.server, user=self.request.user
        ).exists():
            raise PermissionDenied(detail="You are banned from this server.")

        if models.ServerMember.objects.filter(
            server=invite.server, user=self.request.user
        ):
            return response.Response(
                data={"message": "You are already a member of this server"},
                status=status.HTTP_403_FORBIDDEN,
            )

        models.ServerMember.objects.create(server=invite.server, user=self.request.user)

        invite.uses += 1
        invite.save()

        if invite.is_expired:
            invite.is_deleted = True
            invite.save()

        return response.Response(status=status.HTTP_200_OK)


class ServerInviteListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.ServerInvitePartialSerializer

    def get_queryset(self):
        server = get_object_or_404(
            models.Server, pk=self.kwargs["pk"], is_deleted=False
        )

        if server.owner != self.request.user:
            raise PermissionDenied()

        return models.ServerInvite.valid_objects.filter(server=server).select_related(
            "inviter"
        )

    def perform_create(self, serializer):
        server = get_object_or_404(models.Server, pk=self.kwargs["pk"])

        serializer.save(server=server, inviter=self.request.user)


class CreateServerAPIView(generics.CreateAPIView):
    serializer_class = serializers.ServerSerializer

    def perform_create(self, serializer):
        server = serializer.save(owner=self.request.user)
        models.ServerMember.objects.create(server=server, user=self.request.user)


class ListServerMembersAPIView(generics.ListAPIView):
    serializer_class = serializers.ServerMembershipSerializer

    perm_server_kwargs = "pk"
    permission_classes = [IsAuthenticated, IsServerMember & ReadOnly]

    def get_queryset(self):
        server = get_object_or_404(
            models.Server, pk=self.kwargs["pk"], is_deleted=False
        )
        return models.ServerMember.objects.filter(server=server).select_related("user")


class RetrieveDeleteServerMemberAPIView(generics.RetrieveDestroyAPIView):
    serializer_class = serializers.ServerMembershipSerializer

    perm_server_path = "server"
    perm_server_kwargs = "server_pk"
    permission_classes = [IsAuthenticated, IsServerOwner]

    def get_object(self):
        user_id = self.kwargs["pk"]
        server_id = self.kwargs["server_pk"]

        member = get_object_or_404(
            models.ServerMember, user__id=user_id, server__id=server_id
        )

        return member

    # DELETE = KICK
    def perform_destroy(self, instance):
        if instance.user == instance.server.owner:
            raise PermissionDenied()

        super().perform_destroy(instance)


class ListServerBansAPIView(generics.ListAPIView):
    serializer_class = serializers.ServerBanSerializer

    perm_server_path = "server"
    perm_server_kwargs = "pk"
    permission_classes = [IsAuthenticated, IsServerOwner]

    def get_queryset(self):
        server_id = self.kwargs["pk"]
        server = get_object_or_404(models.Server, id=server_id)

        return models.ServerBan.objects.filter(server=server).select_related("user")


class RetrieveDeleteCreateServerBanAPIView(
    generics.RetrieveDestroyAPIView, generics.CreateAPIView
):
    serializer_class = serializers.ServerBanSerializer

    perm_server_path = "server"
    perm_server_kwargs = "server_pk"
    permission_classes = [IsAuthenticated, IsServerOwner]

    def get_queryset(self):
        server_id = self.kwargs["server_pk"]
        server = get_object_or_404(models.Server, id=server_id)

        return models.ServerBan.objects.filter(server=server).select_related("user")

    def get_object(self):
        server_id = self.kwargs["server_pk"]
        server = get_object_or_404(models.Server, id=server_id)

        user_id = self.kwargs["user_pk"]
        user = get_object_or_404(models.User, id=user_id)

        return get_object_or_404(models.ServerBan, user=user, server=server)

    def perform_create(self, serializer):
        server_id = self.kwargs["server_pk"]
        server = get_object_or_404(models.Server, id=server_id)

        user_id = self.kwargs["user_pk"]
        member = get_object_or_404(models.ServerMember, user__id=user_id, server=server)

        if member.user == server.owner:
            raise PermissionDenied()

        serializer.save(server=server, user=member.user)

        member.delete()
