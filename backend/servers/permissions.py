from django.shortcuts import get_object_or_404
from core import permissions
from .models import Server, ServerMember


class IsServerOwnerOrMemberRetrieve(permissions.BasePermission):
    def has_permission(self, request, view):
        
        if hasattr(view, 'perm_server_kwargs'):
            server_pk = view.kwargs.get(view.perm_server_kwargs)
            server = get_object_or_404(Server, pk=server_pk)

            if request.method == 'GET':
                is_member = ServerMember.objects.filter(server=server, user=request.user).exists()
                return is_member

            return server.owner == request.user

        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if not hasattr(view, 'perm_server_path'):
            raise AttributeError(f'You need to add perm_server_path if you want to use {self.__class__.__name__} permission')

        path = view.perm_server_path
        server = self._get_nested_attribute(path, obj)

        if server is None:
            return True

        if request.method == 'GET':
            is_member = ServerMember.objects.filter(server=server, user=request.user).exists()
            if is_member: return True

        return request.user == server.owner
