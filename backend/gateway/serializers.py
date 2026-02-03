from rest_framework import serializers


class GatewaySendPayloadSerializer(serializers.Serializer):
    opcode = serializers.IntegerField()
    data = serializers.JSONField()


class IdentifyDataSerializer(serializers.Serializer):
    token = serializers.CharField()


class RoomSubscribeSerializer(serializers.Serializer):
    id = serializers.UUIDField()


class ServerSubscribeDataSerializer(serializers.Serializer):
    server_id = serializers.UUIDField()
    rooms = RoomSubscribeSerializer(many=True)


class GatewayDispatchEventSerializer(serializers.Serializer):
    opcode = serializers.IntegerField()
    data = serializers.JSONField()
    type = serializers.CharField()