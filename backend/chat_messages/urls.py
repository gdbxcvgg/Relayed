from django.urls import path, include
from . import views


room_msg_urlpatterns = [
    path('<uuid:room_pk>/messages/<uuid:msg_pk>', views.MessageRetrieveUpdateAPIView.as_view()),
]



urlpatterns = [
    path('rooms/', include(room_msg_urlpatterns)),
]