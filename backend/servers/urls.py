from django.urls import path, include
from . import views


servers_urlpatterns = [
    path('<uuid:pk>', views.ServerRetrieveUpdateAPIView.as_view()),
    path('<uuid:pk>/rooms', views.ServerRoomsListCreateAPIView.as_view()),
]


invites_urlpatterns = [
    path('<str:invite_code>', views.ServerInviteRetrieveJoinServerAPIView.as_view()),
]


urlpatterns = [
    path('servers/', include(servers_urlpatterns)),
    path('invites/', include(invites_urlpatterns)),
]