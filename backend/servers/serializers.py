from rest_framework import serializers
from users.serializers import UserSerializer
from . import models



class PartialServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Server
        fields = ['id', 'name', 'icon', 'created_at']


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        id = serializers.UUIDField(read_only=True)
        owner = UserSerializer(read_only=True)
        created_at = serializers.DateTimeField(read_only=True)
        
        model = models.Server
        fields = ['id', 'owner', 'name', 'icon', 'created_at']


class ServerMembershipSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(source='user.id')
    class Meta:
        model = models.ServerMember
        fields = ['id', 'user_id', 'joined_at']