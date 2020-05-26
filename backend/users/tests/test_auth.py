from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from users.models import User
import time


class AuthTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Save a user in the database
        cls.user_raw_password = "Finch"
        cls.user = User.objects.create_user(
            username="Atticus", password=cls.user_raw_password
        )

    def test_login(self):
        url = reverse("login")
        data = {"username": self.user.username, "password": self.user_raw_password}

        time.sleep(
            0.050
        )  # Sleep to make sure that the user's last_login attribute will be updated

        # Check that the request was accepted.
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response contains valid tokens.
        # SimpleJWT token classes throw exceptions when instantiated with invalid tokens.
        AccessToken(response.data.get("access"))
        RefreshToken(response.data.get("refresh"))

        # Check that the user's last_login attribute was updated
        self.assertTrue(
            User.objects.get(username=self.user.username).last_login
            > self.user.last_login
        )

    def test_refresh(self):
        refresh_token = RefreshToken.for_user(self.user)
        url = reverse("refresh")
        data = {"refresh": str(refresh_token)}

        # Check that the request was accepted.
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the response contains a valid access token.
        AccessToken(response.data.get("access"))
