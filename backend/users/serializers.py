from rest_framework import serializers
from users.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.signals import user_logged_in


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "last_login"]
        read_only_fields = ["last_login"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"], password=validated_data["password"]
        )


class LoginSerializer(TokenObtainPairSerializer):
    """
    Send a user_logged_in signal when a new pair of tokens is generated.

    See https://github.com/davesque/django-rest-framework-simplejwt/issues/132
    and https://github.com/davesque/django-rest-framework-simplejwt/pull/136 for more information.
    """

    def validate(self, attrs):
        data = super().validate(attrs)
        user_logged_in.send(User, user=self.user)

        return data
