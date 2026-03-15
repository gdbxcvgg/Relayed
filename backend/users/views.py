from django.contrib.auth import get_user_model
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny
from . import serializers


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
    serializer_class = serializers.PartialServerSerializer
    
    def get_queryset(self):
        from servers.models import Server
        return Server.objects.filter(servermember__user=self.request.user)


class UserServerMemberRetrieveDeleteAPIView(generics.RetrieveDestroyAPIView):
    from servers import serializers
    serializer_class = serializers.ServerMembershipSerializer

    def get_object(self):
        from servers.models import ServerMember
        member = get_object_or_404(ServerMember, server__id=self.kwargs['pk'], user=self.request.user)
        return member