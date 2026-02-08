from core.permissions import BasePermission


class IsMessageAuthor(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user