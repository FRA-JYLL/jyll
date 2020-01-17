from django.db import models
from game.models import Player


class GameManager(models.Manager):
    """ Custom manager for Game, overwrites create method """
    def create(self, creator, name='jyll game'):
        """
        Create a new game instance, with user as admin

        Args:
            * creator (users.User) : User which creates the new game
        """
        new_game = super().create(name=name)
        player = Player.objects.create(game=new_game, user=creator, is_admin=True)
        return new_game


class Game(models.Model):
    """
    Main game model

    Fields:
        * name (str)
        * is_pending (bool): game state
        * password (str): should be a special field, same as user password ?
        * creation_date (datetime)
    """
    name = models.CharField(max_length=42, default='')
    is_pending = models.BooleanField(default=True)
    password = models.CharField(max_length=100, default='')
    creation_date = models.DateTimeField(auto_now_add=True)

    objects = GameManager()  # link to custom manager

    def __str__(self):
        return self.name
