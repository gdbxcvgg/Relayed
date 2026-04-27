from rest_framework import serializers
from users.serializers import UserSerializer
from . import models


class ServerSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    owner = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = models.Server
        fields = ['id', 'owner', 'name', 'icon', 'created_at']


class ServerMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = models.ServerMember
        fields = ['user', 'joined_at']


class ServerInviteSerializer(serializers.ModelSerializer):
    server = ServerSerializer(read_only=True)
    inviter = UserSerializer(read_only=True)
    code = serializers.CharField(read_only=True)
    expires_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = models.ServerInvite
        fields = ['id', 'inviter', 'server', 'code', 'created_at', 'expires_at']


class ServerInvitePartialSerializer(serializers.ModelSerializer):
    inviter = UserSerializer(read_only=True)
    code = serializers.CharField(read_only=True)
    uses = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = models.ServerInvite
        fields = ['id', 'inviter', 'code', 'created_at', 'expires_at', 'max_uses', 'uses']


class ServerLeftSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = models.Server 
        fields = ['id']


class ServerBanSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = models.ServerBan
        fields = ['user', 'reason', 'created_at']