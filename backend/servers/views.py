from rest_framework import generics
from . import models, serializers
from rest_framework.exceptions import PermissionDenied


class ServerRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.ServerSerializer

    def get_queryset(self):
        return models.Server.objects.filter(servermember__user=self.request.user)

    def perform_update(self, serializer):
        server = self.get_object()
        if server.owner != self.request.user:
            raise PermissionDenied

        super().perform_update(serializer)