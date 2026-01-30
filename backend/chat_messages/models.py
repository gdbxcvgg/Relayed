from django.db import models
from django.contrib.auth import get_user_model
from rooms.models import Room
import uuid


User = get_user_model()


class Message(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid7)
    
    content = models.CharField(max_length=10000, null=True, blank=True)

    room = models.ForeignKey(Room, null=True, on_delete=models.SET_NULL)
    author = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.content
    
    @property
    def edited(self):
        return self.edited_at is not None


    class Meta:
        ordering = ['-id']