from copy import deepcopy

from django.contrib import admin

from . import models


@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "name",
        "room_type",
        "created_at",
        "server",
        "parent",
        "is_deleted",
    ]

    readonly_fields = ["id", "created_at"]

    fieldsets = [
        [
            "Basic Info",
            {
                "fields": ["id", "room_type", "name", "description"],
            },
        ],
        [
            "Related Objects",
            {
                "fields": ["server", "parent"],
            },
        ],
        ["Other", {"fields": ["created_at", "is_deleted"]}],
    ]

    def get_fieldsets(self, request, obj=None):
        fs = deepcopy(self.fieldsets)

        if obj.room_type == models.Room.TypeChoices.DM:
            DM_FS = ["DM", {"fields": ["recipients"]}]
            fs.append(DM_FS)

        return fs

    def get_queryset(self, request):
        qs = super().get_queryset(request=request)
        return qs.select_related("server", "parent")
