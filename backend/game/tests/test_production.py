from django.test import TestCase
from game.models import Game
from users.models import User
import numpy as np


class ProductionTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username="Paul", password="Atreides")
        game = Game.objects.create(creator=user, password=None)
        cls.ratings = game.players.first().ratings
        cls.production = game.players.first().production

    def test_income(self):
        initial_money = ProductionTests.production.player.resources.money
        initial_hydrocarbon = ProductionTests.production.player.resources.hydrocarbon
        [money_prod, hydrocarbon_prod, hydrocarbon_consumption] = (
            np.random.random(3) * 10
        )
        ProductionTests.production.money = money_prod
        ProductionTests.production.hydrocarbon = hydrocarbon_prod
        ProductionTests.production.hydrocarbon_consumption = hydrocarbon_consumption
        ProductionTests.production.save()
        ProductionTests.production.player.run_income()
        self.assertAlmostEqual(
            ProductionTests.production.player.resources.money,
            money_prod + initial_money,
        )
        self.assertAlmostEqual(
            ProductionTests.production.player.resources.hydrocarbon,
            initial_hydrocarbon
            + ProductionTests.production.player.game.hydrocarbon_supply.multiplier
            * hydrocarbon_prod
            - hydrocarbon_consumption,
        )
