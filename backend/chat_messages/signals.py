from django.dispatch.dispatcher import receiver
from django.db.models.signals import post_save
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from gateway import opcodes as OPCODES
from gateway import events as EVENTS
from . import serializers
from . import models


@receiver(post_save, sender=models.Message)
def send_new_room_message_to_gateway(sender, instance, created, **kwargs):
    if not created:
        return
    
    group_name = f'room_{instance.room.id}'
    channel_layer = get_channel_layer()

    serializer_message = serializers.MessageSerializer(instance=instance)
    

    async_to_sync(channel_layer.group_send)(
        group_name, {
            'type': 'dispatch_event', 
            'opcode': OPCODES.DISPATCH, 
            'data': serializer_message.data,
            'e_type': EVENTS.ROOM_MESSAGE_SEND
        }
    )
