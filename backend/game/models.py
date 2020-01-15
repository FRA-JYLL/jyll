from django.db import models
from users.models import User


class Game(models.Model):
    """ doc """
    name = models.CharField(max_length=42, default='jyll game')
    is_pending = models.BooleanField(default=True)
    password = models.CharField(max_length=100, default='')
    creation_date = models.DateTimeField(auto_now_add=True)
    admin = models.ForeignKey(User, on_delete=models.DO_NOTHING)  # on_delete change admin / OneToOne ??

    def __str__(self):
        return self.name

    @classmethod
    def create(cls, user):
        """ user creates a new game """
        new_game = cls(admin=user)
        new_game.save()
        player = Player.objects.create(game=new_game, user=user)
        return new_game


class Player(models.Model):
    """ doc """
    game = models.ForeignKey(Game, related_name='players', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='players', on_delete=models.CASCADE)  # OneToOne ??

    @property
    def is_admin(self):
        return game.admin.pk == self.user.pk

    @property
    def playername(self):
        return self.user.username

    def __str__(self):
        return self.playername


class GameSettings(models.Model):
    """ Before game settings """
    game = models.OneToOneField(Game, related_name='settings', on_delete=models.CASCADE)
