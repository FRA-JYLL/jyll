from django.db import models


class Player(models.Model):
    """
    Player model

    Fields:
        * game (Game): game in which the player plays
        * user (users.User): user controlling the player
        * is_admin (bool):
    """
    game = models.ForeignKey('Game', related_name='players', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', related_name='players', on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
