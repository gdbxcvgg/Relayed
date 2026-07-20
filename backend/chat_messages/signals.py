from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models import signals
from django.dispatch.dispatcher import receiver

from gateway import events as EVENTS
from gateway import opcodes as OPCODES

from . import models, serializers


@receiver(signals.post_delete, sender=models.Message)
def dispatch_message_deleted_to_gateway(sender, instance, soft_delete=False, **kwargs):
    if instance.is_deleted and not soft_delete:
        return

    group_name = f"room_{instance.room.id}"
    channel_layer = get_channel_layer()

    serializer_message = serializers.MessageDeletedSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_message.data,
            "e_type": EVENTS.ROOM_MESSAGE_DELETED,
        },
    )


@receiver(signals.post_save, sender=models.Message)
def dispatch_message_updated_to_gateway(sender, instance, created, **kwargs):
    if created:
        return

    if instance.is_deleted:
        return dispatch_message_deleted_to_gateway(sender, instance, soft_delete=True)

    group_name = f"room_{instance.room.id}"
    channel_layer = get_channel_layer()

    serializer_message = serializers.MessageSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_message.data,
            "e_type": EVENTS.ROOM_MESSAGE_UPDATED,
        },
    )
