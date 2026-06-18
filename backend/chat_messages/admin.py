from django.contrib import admin
from . import models


@admin.register(models.Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "room",
        "author",
        "created_at",
        "edited",
        "edited_at",
        "content",
        "is_deleted",
    ]

    readonly_fields = ["id", "created_at", "author", "room"]

    fieldsets = [
        ["Basic Info", {"fields": ["id", "content"]}],
        ["Related objects", {"fields": ["author", "room"]}],
        ["Dates", {"fields": ["created_at", "edited_at"]}],
        ["Flags", {"fields": ["is_deleted"]}],
    ]

    def get_queryset(self, request):
        qs = super().get_queryset(request=request)
        return qs.select_related("author", "room")
