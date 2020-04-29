from django.db import models
from game.models import Player


class GameManager(models.Manager):
    """Custom manager for Game, overwrites create method"""
    def create(self, creator, name=None, password=None):
        """Create a new game, and a player admin associated with creator

        Args:
            creator: users.User, User which creates the new game
            name: string, game name (optional, set to "creator's game" if set to None)
            password: string, game password (no password if None)
        """
        # Set a default name if not provided
        if name is None:
            name = creator.username + "'s game"

        new_game = super().create(name=name, password=password)

        # creator becomes a player and admin of new game
        Player.objects.create(game=new_game, user=creator, is_admin=True)
        return new_game

    def with_user(self, user_id):
        """Returns all games with a player controlled by user having id=user_id"""
        ids_with_user = [player.game.id for player in Player.objects.filter(user_id=user_id)]
        return self.filter(id__in=ids_with_user)


class Game(models.Model):
    name = models.CharField(max_length=42)
    is_pending = models.BooleanField(default=True)  # game state
    password = models.CharField(max_length=100, blank=True, null=True)
    creation_date = models.DateTimeField(auto_now_add=True)

    objects = GameManager()  # link to custom manager

    def __str__(self):
        return self.name

    def are_all_players_ready(self):
        """Check if all players are ready"""
        for player in self.players.all():
            if not player.is_ready:
                return False
        return True

    def _run_setup(self):
        """Run the game setup"""
        assert not self.is_pending, "The game is still pending, all players should be ready"

    def start(self):
        self.is_pending = False
        self.save()
        self._run_setup()

