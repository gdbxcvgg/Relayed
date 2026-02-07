from rest_framework import generics, response, views, status, mixins
from . import models, serializers
from rooms.serializers import RoomSerializer
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from .permissions import IsServerOwnerOrMemberRetrieve


class ServerRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.ServerSerializer
    queryset = models.Server.objects
    
    perm_server_path = 'self'
    permission_classes = [IsServerOwnerOrMemberRetrieve]


class ServerRoomsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        from rooms.models import Room

        server = get_object_or_404(models.Server, pk=self.kwargs['pk'], is_deleted=False)
        
        if not models.ServerMember.objects.filter(server=server, user=self.request.user):
            raise PermissionDenied

        return Room.objects.filter(server=server)

    def perform_create(self, serializer):
        server = get_object_or_404(models.Server, pk=self.kwargs['pk'])
        if server.owner != self.request.user:
            raise PermissionDenied
        
        serializer.save(server=server)


class ServerInviteRetrieveJoinServerAPIView(generics.RetrieveAPIView, mixins.CreateModelMixin):
    serializer_class = serializers.ServerInviteSerializer


    def get_object(self):
        invite_code = self.kwargs['invite_code']
        invite = get_object_or_404(models.ServerInvite, code=invite_code, is_deleted=False)
        return invite


    # Join Server
    def post(self, request, *args, **kwargs):
        invite = self.get_object()

        if models.ServerMember.objects.filter(server=invite.server, user=self.request.user):
            return response.Response(
                data={'message': 'You are already a member of this server'},
                status=status.HTTP_403_FORBIDDEN,
            )

        models.ServerMember.objects.create(server=invite.server, user=self.request.user)

        invite.uses += 1
        invite.save()

        if invite.is_expired:
            invite.is_deleted = True
            invite.save()

        return response.Response(status=status.HTTP_200_OK)


class CreateServerAPIView(generics.CreateAPIView):
    serializer_class = serializers.ServerSerializer

    def perform_create(self, serializer):
        server = serializer.save(owner=self.request.user)
        models.ServerMember.objects.create(server=server, user=self.request.user)


class ListServerMembersAPIView(generics.ListAPIView):
    serializer_class = serializers.ServerMembershipSerializer

    def get_queryset(self):
        server = get_object_or_404(models.Server, pk=self.kwargs['pk'])
        return models.ServerMember.objects.filter(server=server)