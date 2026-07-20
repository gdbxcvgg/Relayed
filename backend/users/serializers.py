from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.validators import ValidationError

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    date_of_birth = serializers.DateField(write_only=True, required=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ["email", "username", "date_of_birth", "display_name", "password"]

    def validate_email(self, email: str):
        if User.objects.filter(email=email.lower()).exists():
            raise ValidationError("User with this email already exists.")
        return email

    def validate_username(self, username: str):
        if User.objects.filter(username=username.lower()).exists():
            raise ValidationError("User with this username already exists.")
        return username

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    username = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ["id", "username", "display_name", "avatar"]


class SelfUserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "display_name", "avatar", "email"]

    def validate_username(self, username):
        user = self.context["request"].user
        if User.objects.filter(username=username).exclude(pk=user.id).exists():
            raise ValidationError("User with this username already exists.")
        if len(username) < 2:
            raise ValidationError(
                "Username is too short. Minimum 2 characters are required."
            )
        if len(username) > 64:
            raise ValidationError(
                "Username is too long. Maximum 64 characters are allowed."
            )

        return username
