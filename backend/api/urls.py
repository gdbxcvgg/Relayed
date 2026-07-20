from django.urls import include, path

urlpatterns = [
    path("", include("users.urls")),
    path("", include("servers.urls")),
    path("", include("chat_messages.urls")),
    path("rooms/", include("rooms.urls")),
]
