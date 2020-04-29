from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch
from users.models import User
from game.models import Player, Game


class PlayerApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        """Create a User and a game with this user (which also creates a player)"""
        cls.user = User.objects.create_user(username='Paul', password='Atreides')
        cls.game = Game.objects.create(creator=cls.user, name='Arrakis', password=None)

    def test_retrieve_player(self):
        self.client.force_authenticate(user=PlayerApiTests.user)
        player_id = Player.objects.first().id
        url = reverse('player-detail', args=[player_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_player_unauthenticated(self):
        # test retrieve without user authentication
        url = reverse('player-detail', args=[Player.objects.first().id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_unauthorized(self):
        user = User.objects.create_user(username='Vladimir', password='Harkonnen')
        self.client.force_authenticate(user=user)
        player_id = Player.objects.first().id
        url = reverse('player-detail', args=[player_id])
        data = dict(is_ready=True)
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    @patch('game.tasks.start_game.delay')
    def test_player_update_to_ready(self, start_game_task):
        self.client.force_authenticate(user=PlayerApiTests.user)
        player_id = Player.objects.first().id
        url = reverse('player-detail', args=[player_id])
        data = dict(is_ready=True)
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Player.objects.first().is_ready)
        start_game_task.assert_called_once_with(PlayerApiTests.game.id)
