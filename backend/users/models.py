import uuid

from django.contrib.auth.models import AbstractUser
from django.core import validators
from django.db import models


class UsernameCharactersValidator(validators.RegexValidator):
    "Accept only letters, numbers, underscores (_) and dots (.)"

    regex = r"^[a-zA-Z0-9_.]+$"
    message = (
        "Username may only include letters, numbers, underscores (_) and dots (.)."
    )


class User(AbstractUser):
    username_validator = UsernameCharactersValidator()

    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid7)

    username = models.CharField(
        max_length=64,
        unique=True,
        validators=[username_validator, validators.MinLengthValidator(2)],
    )
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)

    display_name = models.CharField(max_length=100, null=True, blank=True)
    avatar = models.CharField(max_length=200, null=True, blank=True)

    first_name = None
    last_name = None

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def clean(self):
        super().clean()
        self.username = self.username.lower()

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def get_full_name(self):
        if self.display_name:
            return self.display_name
        return self.username

    get_short_name = get_full_name
