from django.db import models
import json


initial_state_file = "game/static/player_ratings/initial_state.json"


class BaseRatings(models.Model):
    economy = models.FloatField(default=0)
    society = models.FloatField(default=0)
    environment = models.FloatField(default=0)

    class Meta:
        abstract = True


class PlayerRatingsManager(models.Manager):
    """ Custom manager for PlayerRatings, overwrites create method """

    with open(initial_state_file) as file:
        _initial_state = json.load(file)

    @property
    def initial_state(self):
        return self._initial_state

    def create(self, player, economy=None, society=None, environment=None):
        if economy is None:
            economy = self._initial_state["economy"]
        if society is None:
            society = self._initial_state["society"]
        if environment is None:
            environment = self._initial_state["environment"]
        new_ratings = super().create(
            player=player, economy=economy, society=society, environment=environment
        )

        return new_ratings


class PlayerRatings(BaseRatings):
    player = models.OneToOneField(
        "Player", on_delete=models.CASCADE, related_name="ratings"
    )

    objects = PlayerRatingsManager()

    @property
    def score(self):
        return sum(
            [
                ((index + 1) * value)
                for (index, value) in enumerate(
                    sorted([self.economy, self.society, self.environment], reverse=True)
                )
            ]
        )

    def add(self, other):
        self.economy += other.economy
        self.society += other.society
        self.environment += other.environment
        self.save()


class BuildingRatings(BaseRatings):
    building = models.OneToOneField(
        "Building", on_delete=models.CASCADE, related_name="ratings"
    )
