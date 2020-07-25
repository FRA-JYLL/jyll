from django.test import TestCase
from game.models import Game, Player
from users.models import User


class BuildingTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username="Paul", password="Atreides")
        Game.objects.create(creator=user, password=None)

    def test_setup(self):
        """Check that the four starter buildings are unlocked, have 1 copies each and quantity_cap of 5."""
        player = Player.objects.first()
        starter_buildings = player.buildings.select_subclasses()

        # check that starter building is not empty (currently there are 4)
        self.assertEqual(starter_buildings.count(), 4)

        for building in starter_buildings:
            self.assertEqual(building.copies, 1)
            self.assertEqual(building.quantity_cap, 5)

    def test_build(self):
        """Check if the build method behave as expected."""
        player = Player.objects.first()
        building = player.buildings.select_subclasses().get(class_idx=0)
        copies = building.copies
        building.build()
        self.assertEqual(building.copies, copies + 1)
