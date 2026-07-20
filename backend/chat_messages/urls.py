from django.urls import include, path

from . import views

room_msg_urlpatterns = [
    path("<uuid:room_pk>/messages", views.MessageListCreateAPIView.as_view()),
    path(
        "<uuid:room_pk>/messages/<uuid:msg_pk>",
        views.MessageRetrieveUpdateDeleteAPIView.as_view(),
    ),
]


urlpatterns = [
    path("rooms/", include(room_msg_urlpatterns)),
]
