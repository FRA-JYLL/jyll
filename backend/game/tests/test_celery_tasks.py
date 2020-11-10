from django.test import SimpleTestCase
from celery.contrib.testing.worker import start_worker

from jyll.celery import app
from game.models import Game
from users.models import User
from game.serializers import PlayerTurnSerializer
from game.tasks import start_game, run_player_turn


# cf. https://stackoverflow.com/questions/46530784/make-django-test-case-database-visible-to-celery
class CeleryTasksTests(SimpleTestCase):
    allow_database_queries = True

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        # import the ping task, because the start worker function needs it
        app.loader.import_module("celery.contrib.testing.tasks")
        # Start up celery worker
        cls.celery_worker = start_worker(app)
        cls.celery_worker.__enter__()

        cls.setupTestData()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

        # Close worker
        cls.celery_worker.__exit__(None, None, None)

    @classmethod
    def setupTestData(cls):
        cls.user = User.objects.create_user(username="Paul", password="Atreides")
        cls.game = Game.objects.create(creator=cls.user, name="Arrakis", password=None)
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

    def test_start_game_task(self):
        start_game.delay(CeleryTasksTests.game.id).get()
        self.assertFalse(Game.objects.get(name="Arrakis").is_pending)

    def test_run_player_turn_task(self):
        player = CeleryTasksTests.game.players.first()

        self.assertIsNone(player.science_buildings.first().domain_focus)

        initial_copies = (
            player.buildings.get(class_index=0).copies,
            player.buildings.get(class_index=1).copies,
        )

        serializer = PlayerTurnSerializer(
            data=CeleryTasksTests.data, context={"player_id": player.id}
        )
        serializer.is_valid(raise_exception=True)

        run_player_turn.delay(player.id, serializer.validated_data).get()

        # check that buildings 0 and 1 were built
        self.assertEqual(
            (
                player.buildings.get(class_index=0).copies,
                player.buildings.get(class_index=1).copies,
            ),
            (initial_copies[0] + 1, initial_copies[1] + 1),
        )

        # check that focus is now on 1
        self.assertEqual(player.science_buildings.first().domain_focus.domain_index, 1)
