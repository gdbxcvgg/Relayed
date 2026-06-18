from django.dispatch.dispatcher import receiver
from django.db.models import signals
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from gateway import opcodes as OPCODES
from gateway import events as EVENTS
from . import serializers
from . import models


@receiver(signals.post_save, sender=models.ServerMember)
def dispatch_server_joined(sender, instance, created, **kwargs):
    if not created:
        return

    group_name = f"user_{instance.user.id}"
    channel_layer = get_channel_layer()

    serializer_server = serializers.ServerSerializer(instance=instance.server)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_server.data,
            "e_type": EVENTS.USER_SERVER_JOINED,
        },
    )


@receiver(signals.post_delete, sender=models.ServerMember)
def dispatch_server_left(sender, instance, **kwargs):
    group_name = f"user_{instance.user.id}"
    channel_layer = get_channel_layer()

    serializer_server = serializers.ServerLeftSerializer(instance=instance.server)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_server.data,
            "e_type": EVENTS.USER_SERVER_LEFT,
        },
    )


@receiver(signals.post_save, sender=models.ServerMember)
def dispatch_server_member_joined(sender, instance, created, **kwargs):
    if not created:
        return

    group_name = f"server_{instance.server.id}"
    channel_layer = get_channel_layer()

    serializer_server = serializers.ServerMembershipSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_server.data,
            "e_type": EVENTS.SERVER_MEMBER_JOINED,
        },
    )


@receiver(signals.post_delete, sender=models.ServerMember)
def dispatch_server_member_left(sender, instance, **kwargs):
    group_name = f"server_{instance.server.id}"
    channel_layer = get_channel_layer()

    serializer_server = serializers.ServerMembershipSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_server.data,
            "e_type": EVENTS.SERVER_MEMBER_LEFT,
        },
    )
