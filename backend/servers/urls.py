from django.urls import include, path

from . import views

servers_urlpatterns = [
    path("", views.CreateServerAPIView.as_view()),
    path("<uuid:pk>", views.ServerRetrieveUpdateDeleteAPIView.as_view()),
    path("<uuid:pk>/rooms", views.ServerRoomsListCreateAPIView.as_view()),
    path("<uuid:pk>/members", views.ListServerMembersAPIView.as_view()),
    path(
        "<uuid:server_pk>/members/<uuid:pk>",
        views.RetrieveDeleteServerMemberAPIView.as_view(),
    ),
    path("<uuid:pk>/invites", views.ServerInviteListCreateAPIView.as_view()),
    path("<uuid:pk>/bans", views.ListServerBansAPIView.as_view()),
    path(
        "<uuid:server_pk>/bans/<uuid:user_pk>",
        views.RetrieveDeleteCreateServerBanAPIView.as_view(),
    ),
]


invites_urlpatterns = [
    path("<str:invite_code>", views.ServerInviteRetrieveJoinServerAPIView.as_view()),
]


urlpatterns = [
    path("servers/", include(servers_urlpatterns)),
    path("invites/", include(invites_urlpatterns)),
]
