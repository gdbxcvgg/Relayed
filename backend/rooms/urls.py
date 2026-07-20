from django.urls import path

from . import views

urlpatterns = [
    path("<uuid:pk>", views.RoomRetrieveUpdateDeleteAPIView.as_view()),
]
