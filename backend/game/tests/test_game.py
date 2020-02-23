from django.test import TestCase
from game.models import Game
from users.models import User


class GameTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        User.objects.create_user(username='Paul', password='Atreides')

    def setUp(self):
        self.une_variable = "Salut !"

    def test_game_creation(self):
        user = User.objects.first()
        Game.objects.create(creator=user, name='Dune')
        self.assertEqual(Game.objects.first().name, 'Dune')
