from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from game.models import Game, Player
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
        url = reverse('game-list')
        data = {'name': 'Dune'}
        response = self.client.post(url, data)
        self.assertEqual(Game.objects.count(), nb_games + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        game = Game.objects.get(name='Dune')
        # Test if a corresponding player was created, and if this player is an admin
        self.assertEqual(game.players.first().user.id, GameApiTests.user.id)
        self.assertTrue(game.players.first().is_admin)

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

    def test_game_unauthenticated(self):
        # test listing without user authentication
        url = reverse('game-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # test retrieve without user authentication
        url = reverse('game-detail', args=[Game.objects.first().id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # test create without user authentication
        url = reverse('game-list')
        data = {'name': 'Dune'}
        response = self.client.get(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestGameManager(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='Paul', password='Atreides')
        Game.objects.create(creator=user, name='Arrakis', password=None)
        other_user = User.objects.create_user(username='Duncan', password='Idaho')
        game = Game.objects.create(creator=other_user, name='Leto', password=None)
        Game.objects.create(creator=other_user, name='Leto II', password=None)
        Player.objects.create(game=game, user=user)

    def test_with_user_function(self):
        games_with_user = [game.name for game in Game.objects.with_user(User.objects.first().id)]
        self.assertIn('Leto', games_with_user)
        self.assertIn('Arrakis', games_with_user)
