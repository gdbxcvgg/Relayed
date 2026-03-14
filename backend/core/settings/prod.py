from .base import *

DEBUG = False


DATABASES = {
    'default': {
        'ENGINE': f'django.db.backends.{env("DJANGO_DB_ENGINE")}',
        'NAME': env('DJANGO_DB_NAME'),
        'USER': env('DJANGO_DB_USER'),
        'PASSWORD': env('DJANGO_DB_PASSWORD'),
        'HOST': env('DJANGO_DB_HOST'),
        'PORT': env('DJANGO_DB_PORT'),
    }
}


CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("redis", 6379)],
        },
    },
}

CORS_ALLOWED_ORIGINS = env.list('DJANGO_CORS_ALLOWED_ORIGINS')