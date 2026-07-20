from django.urls import path

from .consumers import GatewayConsumer

ws_urlpatterns = [
    path("gateway", GatewayConsumer.as_asgi()),
]
