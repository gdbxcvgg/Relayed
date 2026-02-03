from channels.generic.websocket import JsonWebsocketConsumer
from channels import auth
from asgiref.sync import async_to_sync
from .authentication import JWTGatewayAuth
from . import opcodes as OPCODES
from . import serializers


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


    def handle_identify(self, data):
        serializer = serializers.IdentifyDataSerializer(data=data)

        if not serializer.is_valid():
            return self.close()

        token = serializer.validated_data['token']
        self.login(token)

        
    def login(self, token):
        self.user = JWTGatewayAuth.authenticate(token)

        if not self.user:
            return self.close()

        async_to_sync(auth.login)(self.scope, self.user)
        self.scope["session"].save()

        self.subscribe(f'user_{self.user.id}')


    def subscribe(self, group_name):
        async_to_sync(self.channel_layer.group_add)(
            group_name, self.channel_name
        )
        self.subscriptions.append(group_name)
