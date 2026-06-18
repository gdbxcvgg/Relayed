from django.urls import path, include

urlpatterns = [
    path("", include("users.urls")),
    path("", include("servers.urls")),
    path("", include("chat_messages.urls")),
    path("rooms/", include("rooms.urls")),
]
