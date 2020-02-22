from django.db import models
from game.models import Player


class GameManager(models.Manager):
    """Custom manager for Game, overwrites create method"""
    def create(self, creator, name=None, password=''):
        """Create a new game, and a player admin associated with creator

        Args:
            creator: users.User, User which creates the new game
            name: string, game name (optional, set to"creator's game" if not given)
            password: string, game password (optional, empty by default)
        """
        if name is None:
            name = str(creator.username) + "'s game"

        new_game = super().create(name=name, password=password)

        # creator becomes a player and admin of new game
        player = Player.objects.create(game=new_game, user=creator, is_admin=True)
        return new_game


class Game(models.Model):
    """Game model

    Args:
        name: CharField, game name
        is_pending: BooleanField
        password: CharField, game password (empty by default)
        creation_date: DateTimeField, game creation date

        players: ForeignKey from game.Player, players playing in the game
    """
    name = models.CharField(max_length=42)
    is_pending = models.BooleanField(default=True)  # game state
    password = models.CharField(max_length=100, default='')
    creation_date = models.DateTimeField(auto_now_add=True)

    objects = GameManager()  # link to custom manager

    def __str__(self):
        return self.name
