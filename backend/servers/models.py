from django.contrib.auth import get_user_model
from django.db import IntegrityError, models, transaction
from django.utils import timezone
from . import utils
import uuid


User = get_user_model()


class ServerFilteredManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)



class Server(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid7)
    owner = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=200, null=True, blank=True)

    is_deleted = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()
    valid_objects = ServerFilteredManager()

    def __str__(self):
        return self.name


class ServerInviteFilteredManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class ServerInvite(models.Model):
    MAX_CODE_GENERATION_RETRIES = 10

    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid7)

    inviter = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)

    code = models.CharField(max_length=16, unique=True, default=utils.generate_code)

    is_deleted = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, default=utils.time_in_a_week)

    uses = models.IntegerField(default=0)
    max_uses = models.IntegerField(null=True, blank=True)

    objects = models.Manager()
    valid_objects = ServerInviteFilteredManager()


    def __str__(self):
        return self.code


    def save(self, *args, **kwargs):
        if self.pk:
            return super().save(*args, **kwargs)
        
        for _ in range(self.MAX_CODE_GENERATION_RETRIES):
            try:
                with transaction.atomic():
                    return super().save(*args, **kwargs)
            except IntegrityError:
                self.code = utils.generate_code()

        raise IntegrityError("Failed to generate unique invite code!")

    
    @property
    def is_expired(self):
        if timezone.now() > self.expires_at:
            return True
        if self.max_uses and self.uses >= self.max_uses:
            return True
        return False

class ServerMember(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid7)

    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    server = models.ForeignKey(Server, on_delete=models.CASCADE)

    joined_at = models.DateTimeField(auto_now_add=True)
