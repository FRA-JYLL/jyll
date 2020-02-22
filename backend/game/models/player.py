from django.db import models


class PlayerManager(models.Manager):
    """ Custom manager for Player, overwrites create method """
    def create(self, game, user, is_admin=False):
        # check if user is already in game
        if game.players.filter(user__username=user.username):
            print(str(user.username) + ' already controls a player in this game !')
            return
        new_player = super().create(game=game, user=user, is_admin=is_admin)
        return new_player


class Player(models.Model):
    """Player model

    Args:
        game: ForeignKey to game.Game, game in which the player plays
        user: ForeignKey to users.User, user controlling the player
        is_admin: BooleanField, tells if the player is admin of his game
    """
    game = models.ForeignKey('Game', related_name='players', on_delete=models.CASCADE)
    # user controlling the player
    user = models.ForeignKey('users.User', related_name='players', on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    objects = PlayerManager()  # link to custom manager

    def __str__(self):
        return self.user.username
