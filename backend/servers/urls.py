from django.urls import path
from . import views


urlpatterns = [
    path('<uuid:pk>', views.ServerRetrieveUpdateAPIView.as_view()),
    path('<uuid:pk>/rooms', views.ServerRoomsListCreateAPIView.as_view()),
]