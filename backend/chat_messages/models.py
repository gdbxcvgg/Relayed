import uuid

from django.contrib.auth import get_user_model
from django.db import models

from rooms.models import Room

User = get_user_model()


class MessagesFilteredManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class Message(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid7)

    content = models.CharField(max_length=10000, null=True, blank=True)

    room = models.ForeignKey(Room, null=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(null=True, blank=True)

    objects = models.Manager()
    valid_objects = MessagesFilteredManager()

    def __str__(self):
        return self.content

    @property
    def edited(self):
        return self.edited_at is not None

    class Meta:
        ordering = ["-id"]
