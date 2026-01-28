from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny
from . import serializers


User = get_user_model()


class RegisterAPIView(generics.CreateAPIView):
    serializer_class = serializers.RegisterSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.none()
    
        