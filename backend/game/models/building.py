import sys
import json
from django.db import models
from model_utils.managers import InheritanceManager

from .base import BaseModel
from .ratings import BuildingRatings
from .production import BuildingProduction

mapping_file = "game/static/building/mapping.json"
data_file = "game/static/building/data.json"


class BuildingManager(InheritanceManager):
    with open(mapping_file) as file:
        _mapping = json.load(file)
    with open(data_file) as file:
        _data = json.load(file)

    @property
    def data(self):
        return self._data

    @property
    def mapping(self):
        return self._mapping

    def unlock_building(self, player, class_idx):
        """Create a building instance for player.

        Args:
            player: Player instance, to which link the new building instance.
            class_idx: int, id of the building class to instantiate.

        Return:
            new_building: the newly created Building instance.
        """
        building_data = self.data[str(class_idx)]
        class_name = self.mapping[str(class_idx)]

        # create the building instance with the corresponding subclass (we do not use copies)
        new_building = getattr(sys.modules[__name__], class_name).objects.create(
            player=player,
            class_idx=class_idx,
            cost=building_data["cost"],
            **building_data.get("other_fields", {}),
        )

        # create associated ratings and production instances
        BuildingProduction.objects.create(
            building=new_building, **building_data.get("production", {})
        )
        BuildingRatings.objects.create(
            building=new_building, **building_data.get("ratings", {})
        )

        # trigger all passive effects
        for building in player.buildings.exclude(
            id=new_building.id
        ).select_subclasses():
            building.effect_on_building_unlocking(new_building)
        for technology in player.technologies.all().select_subclasses():
            technology.effect_on_building_unlocking(new_building)

        return new_building


class Building(BaseModel):
    player = models.ForeignKey(
        "Player", on_delete=models.CASCADE, related_name="buildings"
    )
    class_idx = models.IntegerField()
    cost = models.FloatField()
    quantity_cap = models.IntegerField(default=0)
    copies = models.IntegerField(default=0)

    objects = BuildingManager()

    class Meta:
        # each building class should be unique for each player
        constraints = [
            models.UniqueConstraint(
                fields=["player", "class_idx"], name="building_unique"
            )
        ]

    def build(self):
        """Build a new copy of the building."""
        assert self.copies < self.quantity_cap

        self.copies += 1
        self.save()

        # pay the building cost
        player_resources = self.player.resources
        player_resources.money -= self.cost
        player_resources.save()

        # add the building production and ratings
        self.player.ratings.add(self.ratings)
        self.player.production.add(self.production)

        # trigger on-build effects
        for technology in self.player.technologies.all():
            technology.effect_on_building_build(self)
        for building in self.player.buildings.exclude(id=self.id):
            building.effect_on_building_build(self)

    def update(self, data):
        """Update the building instance with data config.

        Args:
            data: dict, currently support "quantity_cap" and "copies" keys
        """

        additional_quantity_cap = data.get("quantity_cap", 0)
        self.quantity_cap += additional_quantity_cap
        self.save()

        additional_copies = data.get("copies", 0)
        for copy in range(additional_copies):
            self.build()
        self.save()

    def __str__(self):
        return Building.objects.mapping[str(self.class_idx)]


class BuildingCopy(models.Model):
    """Individual building."""

    building = models.ForeignKey(
        "Building", on_delete=models.CASCADE, related_name="individual_copies"
    )

    class Meta:
        abstract = True


class ScienceBuildingCopy(BuildingCopy):
    """Individual science building."""

    domain_focus = models.ForeignKey(
        "TechnologyDomain",
        related_name="science_buildings",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    def set_focus(self, domain):
        """Focus on a new domain"""
        self.domain_focus = domain
        self.save()
        if domain.next_technology_class_idx is None:
            domain.select_next_technology()


class ScienceBuilding(Building):
    """All buildings producing science points should inherit from this class."""

    class Meta:
        abstract = True

    def build(self):
        ScienceBuildingCopy.objects.create(building=self)
        super().build()


# ----- Building subclasses -----


class Factory(Building):
    def __str__(self):
        return f"{self.copies}/{self.quantity_cap}"


class Refinery(Building):
    def __str__(self):
        return f"{self.copies}/{self.quantity_cap}"


class Farm(Building):
    def __str__(self):
        return f"{self.copies}/{self.quantity_cap}"


class Lab(ScienceBuilding):
    def __str__(self):
        return f"{self.copies}/{self.quantity_cap}"
