from django.test import TestCase
from game.models import Game
from users.models import User


class GameTests(TestCase):
    def test_game_creation(self):
        user = User.objects.create_superuser(username='Paul', password='123')
        print(User.objects.first())
