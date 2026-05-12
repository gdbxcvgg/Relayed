from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.db import models
from servers.models import Server
import uuid

User = get_user_model()

class Room(models.Model):
    class TypeChoices(models.IntegerChoices):
        DM = 0, 'DM'
        SERVER_TEXT = 1, 'SERVER_TEXT'
        SERVER_CATEGORY = 2, 'SERVER_CATEGORY'

    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid7)

    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=200, null=True, blank=True)
    room_type = models.IntegerField(choices=TypeChoices)

    # last_message = models.ForeignKey(..., null=True)
    server = models.ForeignKey(Server, null=True, blank=True, on_delete=models.SET_NULL)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    # used for DM rooms
    recipients = models.ManyToManyField(User)

    def __str__(self):
        return f"{self.name} [{self.get_room_type_display()}]"

    def clean(self):
        TEXT = 1
        CATEGORY = 2

        if not self.parent: return

        if self.room_type == CATEGORY:
            raise ValidationError('Category cannot have parent!')

        if self.parent.room_type != CATEGORY:
            raise ValidationError('Room parent must be of category type!')
        
        if self.server != self.parent.server:
            raise ValidationError('Room\'s parent must be in the same server!')

    def save(self, **kwargs):
        self.full_clean()
        super().save(**kwargs)
