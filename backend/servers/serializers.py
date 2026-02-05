from rest_framework import serializers
from users.serializers import UserSerializer
from . import models


class PartialServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Server
        fields = ['id', 'name', 'icon', 'created_at']


class ServerSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    owner = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = models.Server
        fields = ['id', 'owner', 'name', 'icon', 'created_at']


class ServerMembershipSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(source='user.id')
    
    class Meta:
        model = models.ServerMember
        fields = ['user_id', 'joined_at']


class ServerInviteSerializer(serializers.ModelSerializer):
    server = PartialServerSerializer(read_only=True)
    inviter = UserSerializer(read_only=True)

    class Meta:
        model = models.ServerInvite
        fields = ['id', 'inviter', 'server', 'code', 'created_at', 'expires_at']


class ServerLeftSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = models.Server 
        fields = ['id']