from django.shortcuts import get_object_or_404
from .models import Server, ServerMember
from core import permissions


class IsServerOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if not hasattr(view, 'perm_server_kwargs'):
            return True
        
        server_pk = view.kwargs.get(view.perm_server_kwargs)
        server = get_object_or_404(Server.objects.select_related('owner'), pk=server_pk)
        return server.owner == request.user

    def has_object_permission(self, request, view, obj):
        if not hasattr(view, 'perm_server_path'):
            raise AttributeError(f'You need to add perm_server_path if you want to use {self.__class__.__name__} permission')
        
        server = self._get_nested_attribute(view.perm_server_path, obj)

        if not server: return True
        return server.owner == request.user


class IsServerMember(permissions.BasePermission):
    def has_permission(self, request, view):
        if not hasattr(view, 'perm_server_kwargs'):
            return True

        server_pk = view.kwargs.get(view.perm_server_kwargs)
        server = get_object_or_404(Server, pk=server_pk)

        return ServerMember.objects.filter(
            server=server, user=request.user
        ).exists()
    
    def has_object_permission(self, request, view, obj):
        if not hasattr(view, 'perm_server_path'):
            raise AttributeError(f'You need to add perm_server_path if you want to use {self.__class__.__name__} permission')
        
        server = self._get_nested_attribute(view.perm_server_path, obj)
        
        if not server: return True
        return ServerMember.objects.filter(
            server=server, user=request.user
        ).exists()

