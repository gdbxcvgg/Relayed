from channels.generic.websocket import JsonWebsocketConsumer
from channels import auth
from asgiref.sync import async_to_sync
from .authentication import JWTGatewayAuth
from . import opcodes as OPCODES
from . import events as EVENTS
from . import serializers
from django.shortcuts import get_object_or_404
from servers.models import Server
from rooms.models import Room


class GatewayConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.user = None
        self.subscriptions = []
        self.accept()


    def disconnect(self, close_code):
        for group in self.subscriptions:
            async_to_sync(self.channel_layer.group_discard)(
                group,
                self.channel_name
            )

    def receive_json(self, content, **kwargs): 
        serializer = serializers.GatewaySendPayloadSerializer(data=content)

        if not serializer.is_valid():
            return self.close()

        opcode = serializer.validated_data['opcode']
        data = serializer.validated_data['data']

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

        token = serializer.validated_data['token']
        self.login(token)

    
    def handle_subscribe(self, data):
        serializer = serializers.ServerSubscribeDataSerializer(data=data)

        if not serializer.is_valid():
            return self.close()
        
        server_id = serializer.validated_data['server_id']
        server = get_object_or_404(Server, pk=server_id)

        rooms = serializer.validated_data['rooms']

        for room in rooms:
            room_id = room['id']
            room = get_object_or_404(Room, pk=room_id)

            if room.server != server:
                return self.close()
            
            self.subscribe(f'room_{room_id}')


    def login(self, token):
        self.user = JWTGatewayAuth.authenticate(token)

        if not self.user:
            return self.close()

        async_to_sync(auth.login)(self.scope, self.user)
        self.scope["session"].save()

        self.subscribe(f'user_{self.user.id}')


    def subscribe(self, group_name):
        if group_name in self.subscriptions:
            return
        
        async_to_sync(self.channel_layer.group_add)(
            group_name, self.channel_name
        )
        self.subscriptions.append(group_name)

    
    def dispatch_message(self, event):
        message = event['message']
        self.dispatch_event(
            opcode=OPCODES.DISPATCH, 
            data=message, 
            e_type=EVENTS.ROOM_MESSAGE_SEND
        )

    
    def dispatch_event(self, opcode, data, e_type):
        serializer = serializers.GatewayDispatchEventSerializer(data={
            'opcode': opcode,
            'data': data,
            'type': e_type
        })

        if not serializer.is_valid():
            return self.close()

        self.send_json(serializer.validated_data)