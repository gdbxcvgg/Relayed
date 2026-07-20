from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class UserAdmin(UserAdmin):
    model = User

    list_display = ["id", "username", "email"]
    list_filter = []

    search_fields = ["username", "display_name", "email"]

    ordering = ["-id"]

    readonly_fields = ["id", "date_joined", "last_login"]

    fieldsets = [
        [
            "Basic Info",
            {
                "fields": [
                    "id",
                    "username",
                    "email",
                    "display_name",
                    "date_of_birth",
                    "avatar",
                ],
            },
        ],
        [
            "Authentication",
            {
                "fields": ["password", "last_login"],
            },
        ],
        [
            "Permissions",
            {
                "fields": ["is_active", "is_staff", "is_superuser"],
            },
        ],
        ["Other", {"fields": ["date_joined"]}],
    ]

    add_fieldsets = [
        [
            "Basic Info",
            {
                "fields": ["email", "username", "display_name", "date_of_birth"],
            },
        ],
        [
            "Authentication",
            {
                "fields": ["password1", "password2"],
            },
        ],
        [
            "Permissions",
            {
                "fields": ["is_active", "is_staff", "is_superuser"],
            },
        ],
    ]
