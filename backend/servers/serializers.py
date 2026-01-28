from rest_framework import serializers
from . import models



class PartialServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Server
        fields = ['id', 'name', 'icon', 'created_at']


class ServerMembershipSerializer(serializers.ModelSerializer):
    user_id = serializers.UUIDField(source='user.id')
    class Meta:
        model = models.ServerMember
        fields = ['id', 'user_id', 'joined_at']