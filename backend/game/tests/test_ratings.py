from django.test import TestCase
from game.models import Game
from users.models import User
import numpy as np


class RatingsTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username="Paul", password="Atreides")
        game = Game.objects.create(creator=user, password=None)
        cls.ratings = game.players.first().ratings
        cls.production = game.players.first().production

    def test_score(self):
        player_ratings = np.random.random(3) * 100
        [
            RatingsTests.ratings.economy,
            RatingsTests.ratings.society,
            RatingsTests.ratings.environment,
        ] = player_ratings
        RatingsTests.ratings.save()
        score = RatingsTests.ratings.score
        sorted_ratings = np.sort(player_ratings)
        self.assertAlmostEqual(
            score, sorted_ratings[0] * 3 + sorted_ratings[1] * 2 + sorted_ratings[2]
        )
