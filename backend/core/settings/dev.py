from .base import *


DEBUG = env('DJANGO_DEBUG')


DATABASES = {
    'default': {
        'ENGINE': f'django.db.backends.{env("DJANGO_DB_ENGINE")}',
        'NAME': env('DJANGO_DB_NAME', default=BASE_DIR / 'db.sqlite3'),
        'USER': env('DJANGO_DB_USER', default=None),
        'PASSWORD': env('DJANGO_DB_PASSWORD', default=None),
        'HOST': env('DJANGO_DB_HOST', default=None),
        'PORT': env('DJANGO_DB_PORT', default=None),
    }
}


REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = [
    'rest_framework.renderers.JSONRenderer',
    'rest_framework.renderers.BrowsableAPIRenderer',
]


CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}


CORS_ALLOW_ALL_ORIGINS = True