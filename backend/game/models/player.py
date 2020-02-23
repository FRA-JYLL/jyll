from django.db import models


class Player(models.Model):
    game = models.ForeignKey('Game', related_name='players', on_delete=models.CASCADE)
    # user controlling the player
    user = models.ForeignKey('users.User', related_name='players', on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
