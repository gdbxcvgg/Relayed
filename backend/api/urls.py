from django.urls import path, include


urlpatterns = [
    path('', include('users.urls')),
    path('servers/', include('servers.urls')),
]