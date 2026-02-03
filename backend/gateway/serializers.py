from rest_framework import serializers


class GatewaySendPayloadSerializer(serializers.Serializer):
    opcode = serializers.IntegerField()
    data = serializers.JSONField()


class IdentifyDataSerializer(serializers.Serializer):
    token = serializers.CharField()