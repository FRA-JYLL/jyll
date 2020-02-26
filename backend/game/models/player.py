from django.db import models


class PlayerManager(models.Manager):
    """ Custom manager for Player, overwrites create method """
    def create(self, game, user, is_admin=False):
        # check if user is already in game
        if game.players.filter(user__username=user.username):
            assert False, str(user.username) + ' already controls a player in this game !'
        new_player = super().create(game=game, user=user, is_admin=is_admin)
        return new_player


class Player(models.Model):
    game = models.ForeignKey('Game', related_name='players', on_delete=models.CASCADE)
    # user controlling the player
    user = models.ForeignKey('users.User', related_name='players', on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    objects = PlayerManager()

    def __str__(self):
        return self.user.username
