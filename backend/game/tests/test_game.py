from rest_framework.test import APITestCase
from game.models import Game
from users.models import User
from django.urls import reverse


class GameTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='Paul', password='Atreides')

    def test_game_creation(self):
        self.client.force_authenticate(user=GameTests.user)
        user_id = GameTests.user.id
        url = reverse('game-list')
        data = {'name': 'Dune'}
        response = self.client.post(url, data)
        self.assertEqual(Game.objects.first().name, 'Dune')
