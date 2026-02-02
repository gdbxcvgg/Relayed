from channels.generic.websocket import JsonWebsocketConsumer


class GatewayConsumer(JsonWebsocketConsumer):
    def connect(self):
       self.accept()
       msg = {'message': 'connected!'}
       self.send_json(msg)


    def receive_json(self, content, **kwargs): 
        self.send_json(content)