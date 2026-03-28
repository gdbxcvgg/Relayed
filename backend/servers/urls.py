from django.urls import path, include
from . import views


servers_urlpatterns = [
    path('', views.CreateServerAPIView.as_view()),
    path('<uuid:pk>', views.ServerRetrieveUpdateDeleteAPIView.as_view()),
    path('<uuid:pk>/rooms', views.ServerRoomsListCreateAPIView.as_view()),
    path('<uuid:pk>/members', views.ListServerMembersAPIView.as_view()),
    path('<uuid:pk>/invites', views.ServerInviteListCreateAPIView.as_view()),
]


invites_urlpatterns = [
    path('<str:invite_code>', views.ServerInviteRetrieveJoinServerAPIView.as_view()),
]


urlpatterns = [
    path('servers/', include(servers_urlpatterns)),
    path('invites/', include(invites_urlpatterns)),
]