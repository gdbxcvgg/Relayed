from asgiref.sync import async_to_sync
from channels import auth
from channels.generic import websocket
from django.shortcuts import get_object_or_404

from rooms.models import Room
from servers.models import Server, ServerMember

from . import events as EVENTS
from . import opcodes as OPCODES
from . import serializers
from .authentication import JWTGatewayAuth


class GatewayConsumer(websocket.JsonWebsocketConsumer):
    def connect(self):
        self.user = None
        self.subscriptions = []
        self.accept()

    def disconnect(self, close_code):
        for group in self.subscriptions:
            async_to_sync(self.channel_layer.group_discard)(group, self.channel_name)

    def receive_json(self, content, **kwargs):
        serializer = serializers.GatewaySendPayloadSerializer(data=content)

        if not serializer.is_valid():
            return self.close()

        opcode = serializer.validated_data["opcode"]
        data = serializer.validated_data["data"]

        if opcode == OPCODES.IDENTIFY:
            self.handle_identify(data)

        if not self.user:
            return self.close()

        if opcode == OPCODES.GUILD_SUBSCRIBE:
            self.handle_subscribe(data)

    def handle_identify(self, data):
        serializer = serializers.IdentifyDataSerializer(data=data)

        if not serializer.is_valid():
            return self.close()

        token = serializer.validated_data["token"]
        self.login(token)

    def handle_subscribe(self, data):
        serializer = serializers.ServerSubscribeDataSerializer(data=data)

        if not serializer.is_valid():
            return self.close()
        try:
            server_id = serializer.validated_data["server_id"]
        except:
            server_id = None

        if server_id:
            server = self.get_object(Server, pk=server_id)
            if not server:
                return self.close()

            member = ServerMember.objects.filter(user=self.user, server=server)

            if not member.exists():
                return

        rooms = serializer.validated_data.get("rooms", [])

        for room in rooms:
            room_id = room["id"]
            room = self.get_object(Room, pk=room_id)
            if not room:
                return self.close()

            if server_id and room.server != server:
                return self.close()

            self.subscribe(f"room_{room_id}")

        if server_id:
            self.subscribe(f"server_{server_id}")

    def login(self, token):
        self.user = JWTGatewayAuth.authenticate(token)

        if not self.user:
            return self.close()

        async_to_sync(auth.login)(self.scope, self.user)
        self.scope["session"].save()

        self.subscribe(f"user_{self.user.id}")

    def subscribe(self, group_name):
        if group_name in self.subscriptions:
            return

        async_to_sync(self.channel_layer.group_add)(group_name, self.channel_name)
        self.subscriptions.append(group_name)

    def dispatch_event(self, event):
        opcode = event["opcode"]
        data = event["data"]
        e_type = event["e_type"]

        serializer = serializers.GatewayDispatchEventSerializer(
            data={"opcode": opcode, "data": data, "type": e_type}
        )

        if not serializer.is_valid():
            return self.close()

        if e_type == EVENTS.USER_SERVER_LEFT:
            server = self.get_object(Server, pk=data["id"])
            if not server:
                return self.close()
            self.unsubscribe(f"server_{server.id}")

        self.send_json(serializer.validated_data)

    def unsubscribe(self, group_name):
        if group_name not in self.subscriptions:
            return

        async_to_sync(self.channel_layer.group_discard)(group_name, self.channel_name)
        self.subscriptions.remove(group_name)

    def get_object(self, model, **kwargs):
        obj = model.objects.filter(**kwargs)
        if not obj.exists():
            return self.close()

        return obj.first()
