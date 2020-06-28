from django.db import models

DEFAULT_PROD = {
    "money": 0,
    "hydrocarbon": 0,
    "hydrocarbon_consumption": 0,
    "food": 0,
    "electricity": 0,
    "waste": 0,
    "pollution": 0,
    "science": 0,
}


# TODO: add BuildingProduction model
class BaseProduction(models.Model):
    money = models.FloatField(default=DEFAULT_PROD["money"])
    hydrocarbon = models.FloatField(default=DEFAULT_PROD["hydrocarbon"])
    hydrocarbon_consumption = models.FloatField(
        default=DEFAULT_PROD["hydrocarbon_consumption"]
    )
    food = models.FloatField(default=DEFAULT_PROD["food"])
    electricity = models.FloatField(default=DEFAULT_PROD["electricity"])
    waste = models.FloatField(default=DEFAULT_PROD["waste"])
    pollution = models.FloatField(default=DEFAULT_PROD["pollution"])
    science = models.FloatField(default=DEFAULT_PROD["science"])

    class Meta:
        abstract = True


class PlayerProduction(BaseProduction):
    player = models.OneToOneField(
        "Player", on_delete=models.CASCADE, related_name="production"
    )

    def run_income(self):
        # money income
        self.player.resources.money += self.money
        # hydrocarbon income
        multiplier = self.player.game.hydrocarbon_supply.multiplier
        self.player.resources.hydrocarbon += (
            self.hydrocarbon * multiplier - self.hydrocarbon_consumption
        )
        # save changes
        self.player.resources.save()
