from django.urls import path, include
from rest_framework_simplejwt import views as simplejwt_views
from . import views


auth_urlpatterns = [
    path('token', simplejwt_views.TokenObtainPairView.as_view()),
    path('refresh', simplejwt_views.TokenRefreshView.as_view()),
    path('register', views.RegisterAPIView.as_view()),
]


users_urlpatterns = [
    path('@me', views.UserRetrieveUpdateAPIView.as_view()),
    path('@me/servers', views.UserServerListAPIView.as_view()),
    path('@me/servers/<uuid:pk>/member', views.UserServerMemberRetrieveDeleteAPIView.as_view()),

    path('<uuid:pk>', views.UserRetrieveAPIView.as_view()),
]


urlpatterns = [
    path('auth/', include(auth_urlpatterns)),
    path('users/', include(users_urlpatterns)),
]