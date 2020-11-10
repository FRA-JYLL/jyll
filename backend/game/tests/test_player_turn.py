from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from users.models import User
from game.models import Game, Player
from game.serializers import PlayerTurnSerializer


class PlayerTurnTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="Paul", password="Atreides")
        cls.game = Game.objects.create(creator=cls.user, password=None)
        player = cls.game.players.first()
        player.is_ready = True
        player.save()
        cls.game.start()
        science_building_id = player.science_buildings.first().id
        cls.data = {
            "building_actions": [
                {"class_index": 0, "type": "BUILD"},
                {"class_index": 1, "type": "BUILD"},
            ],
            "science_focuses": [
                {"building_copy_id": science_building_id, "domain_index": 1}
            ],
        }

    def test_player_turn_serializer(self):
        player = Player.objects.first()

        valid_serializer = PlayerTurnSerializer(
            data=PlayerTurnTests.data, context={"player_id": player.id}
        )
        self.assertTrue(valid_serializer.is_valid(raise_exception=True))

        # TODO: test other validation errors
        not_valid_serializer = PlayerTurnSerializer(data=PlayerTurnTests.data)
        self.assertFalse(not_valid_serializer.is_valid())

    @patch("game.tasks.run_player_turn.delay")
    def test_post_player_turn(self, player_turn_task):
        self.client.force_authenticate(user=PlayerTurnTests.user)
        player = PlayerTurnTests.game.players.first()

        url = reverse("player-turn", args=[PlayerTurnTests.user.players.first().id])

        serializer = PlayerTurnSerializer(
            data=PlayerTurnTests.data, context={"player_id": player.id}
        )
        serializer.is_valid(raise_exception=True)

        response = self.client.post(url, PlayerTurnTests.data, format="json")

        # check a positive response is received, and that the player turn task was called
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        player_turn_task.assert_called_once_with(player.id, serializer.validated_data)
