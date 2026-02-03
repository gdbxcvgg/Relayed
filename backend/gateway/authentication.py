from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import get_user_model


User = get_user_model()


class JWTGatewayAuth:
    @staticmethod
    def authenticate(token):
        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            user = User.objects.get(pk=user_id)
            return user
        except (TokenError, InvalidToken, User.DoesNotExist):
            return None