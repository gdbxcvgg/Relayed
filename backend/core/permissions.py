from rest_framework import permissions


class BasePermission(permissions.BasePermission):
    def _get_nested_attribute(self, path:str, obj):
        if path == 'self':
            return obj
        
        for attr in path.split('.'):
            if not hasattr(obj, attr):
                raise AttributeError(f'Object {obj.id} does not have an attribute of {path}')
            v = getattr(obj, attr)
        return v