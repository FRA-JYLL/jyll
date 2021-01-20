import json
from django.test import TestCase
from game.models import Game
from users.models import User


initial_state_file = "game/tests/static/resources/initial_state.json"


class ResourcesTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username="Paul", password="Atreides")
        game = Game.objects.create(creator=user, password=None)
        cls.resources = game.players.first().resources

    def test_initial_state(self):
        with open(initial_state_file) as file:
            initial_state = json.load(file)
        self.assertEqual(ResourcesTests.resources.money, initial_state["money"])
        self.assertEqual(
            ResourcesTests.resources.hydrocarbon, initial_state["hydrocarbon"]
        )
