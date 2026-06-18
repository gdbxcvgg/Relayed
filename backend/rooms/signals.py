from django.dispatch.dispatcher import receiver
from django.db.models import signals
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from gateway import opcodes as OPCODES
from gateway import events as EVENTS
from . import serializers
from . import models


@receiver(signals.post_save, sender=models.Room)
def dispatch_room_created_to_gateway(sender, instance, created, **kwargs):
    if not instance.server:
        return
    if not created:
        return

    group_name = f"server_{instance.server.id}"
    channel_layer = get_channel_layer()

    serializer_room = serializers.ParialRoomSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_room.data,
            "e_type": EVENTS.ROOM_CREATED,
        },
    )


@receiver(signals.post_delete, sender=models.Room)
def dispatch_room_deleted_to_gateway(sender, instance, soft_delete=False, **kwargs):
    if instance.is_deleted and not soft_delete:
        return
    if not instance.server:
        return

    group_name = f"server_{instance.server.id}"
    channel_layer = get_channel_layer()

    serializer_room = serializers.RoomDeletedSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_room.data,
            "e_type": EVENTS.ROOM_DELETED,
        },
    )


@receiver(signals.post_save, sender=models.Room)
def dispatch_room_updated_to_gateway(sender, instance, created, **kwargs):
    if not instance.server:
        return
    if created:
        return

    if instance.is_deleted:
        return dispatch_room_deleted_to_gateway(sender, instance, soft_delete=True)

    group_name = f"server_{instance.server.id}"
    channel_layer = get_channel_layer()

    serializer_room = serializers.ParialRoomSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_room.data,
            "e_type": EVENTS.ROOM_UPDATED,
        },
    )
