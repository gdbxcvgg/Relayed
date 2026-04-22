from django.contrib import admin
from . import models


@admin.register(models.Server)
class ServerAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'owner', 'created_at']
    readonly_fields = ['id', 'created_at']


    fieldsets = [
        ["Basic Info", {
            'fields': ['id', 'name']
        }],
        ["Related Objects", {
            'fields': ['owner']
        }],
        ["Dates", {
            'fields': ['created_at']
        }],
        ["Icon", {
            'fields': ['icon']
        }],
        ["State Flags", {
            'fields': ['is_deleted']
        }],
    ]

    

@admin.register(models.ServerInvite)
class ServerInviteAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'server', 'inviter' , 'code', 'created_at', 
        'expires_at', 'uses', 'max_uses', 'is_expired' 
    ]

    fieldsets = [
        ["Basic Info", {
            'fields': ['id', 'code']
        }],
        ["Related Objects", {
            'fields': ['inviter', 'server']
        }],
        ["Dates", {
            'fields': ['created_at', 'expires_at']
        }],
        ["Uses", {
            'fields': ['uses', 'max_uses']
        }],
        ["State Flags", {
            'fields': ['is_deleted', 'is_expired']
        }],
    ]

    add_fieldsets = [
        ["Related Objects", {
            'fields': ['inviter', 'server']
        }],
        ["Dates", {
            'fields': ['expires_at']
        }],
        ["Uses", {
            'fields': ['uses', 'max_uses']
        }],
        ["State Flags", {
            'fields': ['is_deleted']
        }],
    ]

    readonly_fields = [
        'id', 'created_at', 'expires_at', 'code', 'server', 
        'inviter', 'uses', 'max_uses', 'is_expired'
    ]

    def get_readonly_fields(self, request, obj=None):
        if not obj:
            return []
        else: 
            return self.readonly_fields

    def get_fieldsets(self, request, obj=None):
        if not obj:
            return self.add_fieldsets
        else:
            return self.fieldsets


@admin.register(models.ServerMember)
class ServerAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'server', 'joined_at']
    readonly_fields = ['id', 'joined_at']


    fieldsets = [
        ["Basic Info", {
            'fields': ['id']
        }],
        ["Related Objects", {
            'fields': ['user', 'server']
        }],
        ["Dates", {
            'fields': ['joined_at']
        }],
    ]


@admin.register(models.ServerBan)
class ServerAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'server', 'reason', 'created_at']
    readonly_fields = ['id', 'created_at']
