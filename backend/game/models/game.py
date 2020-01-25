from django.db import models
from game.models import Player


class GameManager(models.Manager):
    """ Custom manager for Game, overwrites create method """
    def create(self, creator, name=None):
        """
        * creator (users.User) : User which creates the new game
        """
        if name is None:
            name = str(creator.username) + "'s game"
        new_game = super().create(name=name)
        # creator becomes a player and admin of new game
        player = Player.objects.create(game=new_game, user=creator, is_admin=True)
        return new_game


class Game(models.Model):
    name = models.CharField(max_length=42, default='')
    is_pending = models.BooleanField(default=True)  # game state
    password = models.CharField(max_length=100, default='')
    creation_date = models.DateTimeField(auto_now_add=True)

    objects = GameManager()  # link to custom manager

    def __str__(self):
        return self.name
