from rest_framework.test import APITestCase
from rest_framework import status
from game.models import Game
from users.models import User
from django.urls import reverse


class GameApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='Paul', password='Atreides')
        cls.game = Game.objects.create(creator=cls.user, name='Arrakis', password=None)

    def test_game_creation(self):
        self.client.force_authenticate(user=GameApiTests.user)
        nb_games = Game.objects.count()
        user_id = GameApiTests.user.id
        url = reverse('game-list')
        data = {'name': 'Dune'}
        response = self.client.post(url, data)
        self.assertEqual(Game.objects.count(), nb_games + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_games(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse('game-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_game(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse('game-detail', args=[GameApiTests.game.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_pending_games(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse('pending-games')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_games_with_user(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse('games-with-user')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
