from rest_framework import serializers
from rest_framework.validators import ValidationError
from django.contrib.auth import get_user_model


User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(write_only=True, required=True)
    display_name = serializers.CharField(required=False)
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email', 'username', 'date_of_birth', 'display_name', 'password']

    
    def validate_email(self, email):
        if User.objects.filter(email=email).exists():
            raise ValidationError("User with this email already exists.")
        return email


    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise ValidationError("User with this username already exists.")
        return username


    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user