from django.contrib import admin
from . import models


@admin.register(models.Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'room_type', 'created_at', 'server', 'parent']

    readonly_fields = ['id', 'created_at']

    fieldsets = [
        ['Basic Info', {
            'fields': ['id', 'room_type', 'name', 'description'],
        }],
        ['Related Objects', {
            'fields': ['server', 'parent'],
        }],
        ['Other', {
            'fields': ['created_at', 'is_deleted']
        }]
    ]