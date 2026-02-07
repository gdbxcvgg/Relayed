from core import permissions
from .models import ServerMember


class IsServerOwnerOrMemberRetrieve(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if not hasattr(view, 'perm_server_path'):
            raise AttributeError(f'You need to add perm_server_path if you want to use {self.__class__.__name__} permission')

        path = view.perm_server_path
        server = self._get_nested_attribute(path, obj)

        if request.method == 'GET':
            is_member = ServerMember.objects.filter(server=server, user=request.user).exists()
            if is_member: return True

        return request.user == server.owner
