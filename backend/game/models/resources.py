from django.db import models
import json


initial_state_file = "game/static/resources/initial_state.json"


class ResourcesManager(models.Manager):
    """ Custom manager for Resources, overwrites create method """

    with open(initial_state_file) as file:
        _initial_state = json.load(file)

    @property
    def initial_state(self):
        return self._initial_state

    def create(self, player, money=None, hydrocarbon=None):
        if money is None:
            money = self._initial_state["money"]
        if hydrocarbon is None:
            hydrocarbon = self._initial_state["hydrocarbon"]
        new_resources = super().create(
            player=player, money=money, hydrocarbon=hydrocarbon
        )

        return new_resources


class Resources(models.Model):
    player = models.OneToOneField("Player", on_delete=models.CASCADE)

    money = models.FloatField(default=0)
    hydrocarbon = models.FloatField(default=0)

    objects = ResourcesManager()
