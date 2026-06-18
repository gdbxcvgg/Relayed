from django.dispatch.dispatcher import receiver
from django.db.models import signals
from django.contrib.auth import get_user_model
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from gateway import opcodes as OPCODES
from gateway import events as EVENTS
from . import serializers

User = get_user_model()


@receiver(signals.post_save, sender=User)
def dispatch_user_updated_to_gateway(sender, instance, created, **kwargs):
    if created:
        return

    group_name = f"user_{instance.id}"
    channel_layer = get_channel_layer()

    serializer_user = serializers.SelfUserSerializer(instance=instance)

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "dispatch_event",
            "opcode": OPCODES.DISPATCH,
            "data": serializer_user.data,
            "e_type": EVENTS.USER_UPDATED,
        },
    )
