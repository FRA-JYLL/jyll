from django.db import models
from .resources import Resources
from .ratings import PlayerRatings
from .production import PlayerProduction


class PlayerManager(models.Manager):
    """ Custom manager for Player, overwrites create method """

    def create(self, game, user, is_admin=False):
        # check if user is already in game
        assert not game.players.filter(user__username=user.username), (
            user.username + " already controls a player in this game !"
        )

        # if is_admin is set to True check that game if empty (i.e. there is no admin yet)
        if is_admin:
            assert game.players.count() == 0, "There is already an admin in this game"

        # Create new player
        new_player = super().create(game=game, user=user, is_admin=is_admin)

        # create associated resources, production, and ratings
        Resources.objects.create(player=new_player)
        PlayerRatings.objects.create(player=new_player)
        PlayerProduction.objects.create(player=new_player)

        return new_player


class Player(models.Model):
    game = models.ForeignKey("Game", related_name="players", on_delete=models.CASCADE)
    # user controlling the player
    user = models.ForeignKey(
        "users.User", related_name="players", on_delete=models.CASCADE
    )
    is_admin = models.BooleanField(default=False)
    is_ready = models.BooleanField(default=False)

    objects = PlayerManager()  # link to custom manager

    def __str__(self):
        return self.user.username
