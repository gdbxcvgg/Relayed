from .base import *

DEBUG = env("DJANGO_DEBUG")

INSTALLED_APPS += ["debug_toolbar"]

MIDDLEWARE.insert(1, "debug_toolbar.middleware.DebugToolbarMiddleware")

DATABASES = {
    "default": {
        "ENGINE": f'django.db.backends.{env("DJANGO_DB_ENGINE")}',
        "NAME": env("DJANGO_DB_NAME", default=BASE_DIR / "db.sqlite3"),
        "USER": env("DJANGO_DB_USER", default=None),
        "PASSWORD": env("DJANGO_DB_PASSWORD", default=None),
        "HOST": env("DJANGO_DB_HOST", default=None),
        "PORT": env("DJANGO_DB_PORT", default=None),
    }
}


REST_FRAMEWORK["DEFAULT_PARSER_CLASSES"] = [
    "rest_framework.parsers.JSONParser",
    "rest_framework.parsers.FormParser",
    "rest_framework.parsers.MultiPartParser",
]

REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = [
    "rest_framework.renderers.JSONRenderer",
    "rest_framework.renderers.BrowsableAPIRenderer",
]

REST_FRAMEWORK["DEFAULT_AUTHENTICATION_CLASSES"] = [
    "rest_framework_simplejwt.authentication.JWTAuthentication",
    "rest_framework.authentication.SessionAuthentication",
]


SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"] = timedelta(hours=8)


CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}


CORS_ALLOW_ALL_ORIGINS = True


INTERNAL_IPS = [
    "127.0.0.1",
]
