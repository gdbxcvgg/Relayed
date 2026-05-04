from django.contrib.auth import get_user_model
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from . import serializers
from servers.models import ServerMember


User = get_user_model()


class RegisterAPIView(generics.CreateAPIView):
    serializer_class = serializers.RegisterSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.none()
    

class UserRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.SelfUserSerializer

    def get_object(self):
        return self.request.user


class UserServerListAPIView(generics.ListAPIView):
    from servers import serializers
    serializer_class = serializers.ServerSerializer
    
    def get_queryset(self):
        from servers.models import Server
        return Server.objects.filter(servermember__user=self.request.user).select_related('owner')


class UserServerMemberRetrieveDeleteAPIView(generics.RetrieveDestroyAPIView):
    from servers import serializers
    serializer_class = serializers.ServerMembershipSerializer
    queryset = ServerMember.objects.select_related('user')

    def get_object(self):
        qs = self.get_queryset()
        member = get_object_or_404(qs, server__id=self.kwargs['pk'], user=self.request.user)
        return member

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        server = instance.server

        if server.owner == instance.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = serializers.UserSerializer
    queryset = User.objects.all()