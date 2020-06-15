from django.test import TestCase, SimpleTestCase
from rest_framework.test import APITestCase
from rest_framework import status
from game.models import Game, Player
from users.models import User
from django.urls import reverse
from celery.contrib.testing.worker import start_worker
from jyll.celery import app
from game.tasks import start_game


class TestGameManager(TestCase):
    def test_with_user_function(self):
        user = User.objects.create_user(username="Paul", password="Atreides")
        Game.objects.create(creator=user, name="Arrakis", password=None)
        other_user = User.objects.create_user(username="Duncan", password="Idaho")
        game = Game.objects.create(creator=other_user, name="Leto", password=None)
        Game.objects.create(creator=other_user, name="Leto II", password=None)
        Player.objects.create(game=game, user=user)

        games_with_user = [
            game.name for game in Game.objects.with_user(User.objects.first().id)
        ]
        self.assertIn("Leto", games_with_user)
        self.assertIn("Arrakis", games_with_user)
        self.assertNotIn("Leto II", games_with_user)


class GameApiTests(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username="Paul", password="Atreides")
        cls.game = Game.objects.create(creator=cls.user, name="Arrakis", password=None)

    def test_game_creation(self):
        self.client.force_authenticate(user=GameApiTests.user)
        nb_games = Game.objects.count()
        url = reverse("game-list")
        data = {"name": "Dune", "password": "12345678"}
        response = self.client.post(url, data)
        self.assertEqual(Game.objects.count(), nb_games + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        game = Game.objects.get(name="Dune")

        # check that game was sent back in data response
        self.assertEqual(response.data["id"], game.id)

        # test if the password was set
        self.assertEqual(game.password, "12345678")
        # Test if a corresponding player was created, and if this player is an admin
        self.assertEqual(game.players.first().user.id, GameApiTests.user.id)
        self.assertTrue(game.players.first().is_admin)

    def test_retrieve_game(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse("game-detail", args=[GameApiTests.game.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_list_pending_games(self):
        self.client.force_authenticate(user=GameApiTests.user)

        # create a new pending
        new_user = User.objects.create(username="Duncan", password="Idaho")
        new_pending_game = Game.objects.create(creator=new_user, name="Giedi Prime")

        url = reverse("game-pending")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # check that Paul sees only Duncan's game in pending games (and not his own game)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], new_pending_game.id)

    def test_list_games_with_user(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse("game-with-user")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_players_in_game(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse("game-players", args=[GameApiTests.game.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_game_unauthenticated(self):
        # test retrieve without user authentication
        url = reverse("game-detail", args=[Game.objects.first().id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # test create without user authentication
        url = reverse("game-list")
        data = {"name": "Dune"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_join(self):
        new_user = User.objects.create(username="Duncan", password="Idaho")
        self.client.force_authenticate(user=new_user)
        url = reverse("game-join", args=[GameApiTests.game.id])
        data = {}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        game = Game.objects.create(creator=GameApiTests.user, name="Dune", password="A")
        url = reverse("game-join", args=[game.id])
        data = {"password": "A"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # check that newly created player was sent back in data response
        player = Player.objects.get(user__id=new_user.id, game__id=game.id)
        self.assertEqual(response.data["id"], player.id)

        data = {"password": "B"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_join_non_pending_game(self):
        new_user = User.objects.create(username="Duncan", password="Idaho")
        self.client.force_authenticate(user=new_user)
        game = Game.objects.create(creator=GameApiTests.user, name="Dune")
        game.is_pending = False
        game.save()

        url = reverse("game-join", args=[game.id])
        data = {}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_join_already_joined(self):
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse("game-join", args=[GameApiTests.game.id])
        data = {}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_leave_game(self):
        nb_players = Player.objects.count()
        self.client.force_authenticate(user=GameApiTests.user)
        url = reverse("game-leave", args=[GameApiTests.game.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Player.objects.count(), nb_players - 1)


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

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

        # Close worker
        cls.celery_worker.__exit__(None, None, None)

    def test_start_game_task(self):
        user = User.objects.create_user(username="Paul", password="Atreides")
        game = Game.objects.create(creator=user, name="Arrakis", password=None)
        # start the game, and wait for the setup to finish
        start_game.delay(game.id).get()
        self.assertFalse(Game.objects.get(name="Arrakis").is_pending)
