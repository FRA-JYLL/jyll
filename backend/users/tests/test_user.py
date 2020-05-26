from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from users.models import User


class UserTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        # Save two users in the database
        cls.user = User.objects.create_user(username="Atticus", password="Finch")
        User.objects.create_user(username="Jem", password="Finch")

    def test_create_user(self):
        initial_number_of_users = User.objects.count()
        username = "Scout"
        password = "Finch"
        url = reverse("user-list")
        data = {"username": username, "password": password}

        # Check that the request was accepted and a new user was added to the database.
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), initial_number_of_users + 1)

        # Check that the new username and password in the database are correct.
        new_user = User.objects.get(username=username)
        self.assertTrue(new_user.check_password(password))

        # Check that the response contains valid tokens.
        # SimpleJWT token classes throw exceptions when instantiated with invalid tokens.
        AccessToken(response.data.get("access"))
        RefreshToken(response.data.get("refresh"))

    def test_list_users(self):
        self.client.force_authenticate(user=self.user)  # Bypass authentication
        url = reverse("user-list")

        # Check that the request was accepted and the response has as many entries as in the database.
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_unauthorized_list_users(self):
        url = reverse("user-list")

        # Check that the request was rejected.
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_user(self):
        self.client.force_authenticate(user=self.user)  # Bypass authentication
        url = reverse("user-detail", args=[self.user.id])

        # Check that the request was accepted.
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthorized_retrieve_user(self):
        url = reverse("user-detail", args=[self.user.id])

        # Check that the request was rejected.
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_user_from_auth_token(self):
        access_token = AccessToken.for_user(self.user)
        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer " + str(access_token)
        )  # Add token to request headers
        url = reverse("user-me")

        # Check that the request was accepted.
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Check that the user_id and username in the response are correct
        self.assertEqual(response.data.get("id"), self.user.id)
        self.assertEqual(response.data.get("username"), self.user.username)

    def test_unauthorized_retrieve_user_from_auth_token(self):
        url = reverse("user-me")

        # Check that the request was accepted.
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
