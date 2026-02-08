from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class BasePermission(permissions.BasePermission):
    def _get_nested_attribute(self, path:str, obj):
        if path == 'self':
            return obj
        v = obj
        for attr in path.split('.'):
            if not hasattr(v, attr):
                raise AttributeError(f'Object {obj.id} does not have an attribute of {path}')
            v = getattr(v, attr)
        return v


class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS