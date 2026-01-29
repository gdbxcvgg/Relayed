from django.urls import path
from . import views


urlpatterns = [
    path('<uuid:pk>', views.ServerRetrieveUpdateAPIView.as_view())
]