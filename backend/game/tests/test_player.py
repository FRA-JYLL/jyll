from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User
from game.models import Player, Game
from game.serializers import PlayerSerializer


class PlayerTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        pass

    def setUp(self):
        self.user = User.objects.create_user(username='Paul', password='Atreides')
        self.game = Game.objects.create(creator=self.user, name='Arrakis')

    def test_player_creation(self):
        """Test player creation
        """
        user = User.objects.create_user(username='Vladimir', password='Harkonnen')

        url = reverse('player-list')
        data = {'game': str(self.game.id), 'user': str(user.id)}
        response = self.client.post(url, data, format='json')
        # Check if a new player was created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Player.objects.count(), 2)
        # check the player is not admin
        new_player = Player.objects.get(user=user, game=self.game)
        self.assertFalse(new_player.is_admin)

    def test_second_player_creation(self):
        """Test if an user cannot create (and control) two players in the same game
        """

        url = reverse('player-list')
        data = {'game': str(self.game.id), 'user': str(self.user.id)}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
