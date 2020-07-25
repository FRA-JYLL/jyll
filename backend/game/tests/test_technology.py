from django.test import TestCase
from game.models import Game, Player
from users.models import User


class TechnologyTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username="Paul", password="Atreides")
        Game.objects.create(creator=user, password=None)

    def test_setup(self):
        """Check that the setup was done correctly as expected.

            * check that the starter technology is developed, and its children are unlocked but not developed yet.
            * check that the starter domain has no next tech, and the other domains have one
        """
        player = Player.objects.first()
        accessible_techs = player.technologies.select_subclasses()

        starter_tech = accessible_techs.get(class_idx=0)
        self.assertEqual(starter_tech.current_level, 1)

        other_techs = accessible_techs.exclude(class_idx=0)
        # check that other_techs is not empty (there are currently 2)
        self.assertEqual(other_techs.count(), 2)

        for tech in other_techs:
            self.assertEqual(tech.current_level, 0)

        tech_domains = player.domains.all()
        starter_domain = tech_domains.get(domain_idx=0)
        self.assertIsNone(starter_domain.next_technology_class_idx)

        other_domains = tech_domains.exclude(domain_idx=0)
        # check that other_domains is not empty (there are currently 2)
        self.assertEqual(other_domains.count(), 2)
        for domain in other_domains:
            self.assertIsNotNone(domain.next_technology_class_idx)

    def test_develop(self):
        """Check if the develop methods behave as we want to."""
        tech = Player.objects.first().technologies.select_subclasses().get(class_idx=1)
        tech.develop()
        self.assertEqual(tech.current_level, 1)
