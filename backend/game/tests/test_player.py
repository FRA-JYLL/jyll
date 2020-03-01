from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from users.models import User
from game.models import Player, Game


class PlayerApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        """Create a User and a game with this user (which also creates a player)"""
        cls.user = User.objects.create_user(username='Paul', password='Atreides')
        cls.game = Game.objects.create(creator=cls.user, name='Arrakis', password=None)

    def test_player_creation(self):
        new_user = User.objects.create_user(username='Vladimir', password='Harkonnen')
        self.client.force_authenticate(user=new_user)

        nb_players = Player.objects.count()
        url = reverse('player-list')

        data = {'game': str(PlayerApiTests.game.id)}  #, 'user': str(new_user.id)}
        response = self.client.post(url, data, format='json')

        # Check if a new player was created
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Player.objects.count(), nb_players + 1)

        # check if the player is not admin
        new_player = Player.objects.get(user=new_user, game=PlayerApiTests.game)
        self.assertFalse(new_player.is_admin)

    def test_second_player_creation(self):
        """A user who already controls a player in a game should not be able to create another
        player in this game
        """
        self.client.force_authenticate(user=PlayerApiTests.user)
        url = reverse('player-list')

        data = {'game': str(PlayerApiTests.game.id), 'user': str(PlayerApiTests.user.id)}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_player_with_inexistant_game(self):
        """Creating a player with a user who doesn't exist should not be possible"""
        self.client.force_authenticate(user=PlayerApiTests.user)
        wrong_game_id = str(sum([game.id for game in Game.objects.all()]) + 1)
        url = reverse('player-list')

        data = {'game': str(wrong_game_id), 'user': str(PlayerApiTests.user.id)}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_list_players(self):
        self.client.force_authenticate(user=PlayerApiTests.user)
        url = reverse('player-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_player(self):
        self.client.force_authenticate(user=PlayerApiTests.user)
        player_id = Player.objects.first().id
        url = reverse('player-detail', args=[player_id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_player(self):
        self.client.force_authenticate(user=PlayerApiTests.user)
        nb_players = Player.objects.count()
        player = Player.objects.first()
        url = reverse('player-detail', args=[player.id])
        response = self.client.delete(url)
        # Check if the player was deleted
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Player.objects.count(), nb_players - 1)

    def test_player_unauthenticated(self):
        # test listing without user authentication
        url = reverse('player-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # test retrieve without user authentication
        url = reverse('player-detail', args=[Player.objects.first().id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # test delete without user authentication
        url = reverse('player-detail', args=[Player.objects.first().id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
