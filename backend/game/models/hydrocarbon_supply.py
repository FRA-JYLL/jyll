from django.db import models


# TODO: use polymorphic to add the option of various multiplier methods
class HydrocarbonSupply(models.Model):
    game = models.OneToOneField(
        "Game", on_delete=models.CASCADE, related_name="hydrocarbon_supply"
    )
    drawn_amount = models.FloatField(default=0)

    @property
    def multiplier(self):
        nb_players = self.game.players.count()
        if self.drawn_amount <= nb_players * 10:
            return 3
        elif self.drawn_amount <= nb_players * 20:
            return 2
        else:
            return 1
