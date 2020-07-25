import sys
import json
from django.db import models
from model_utils.managers import InheritanceManager

from .base import BaseModel
from .building import Building


mapping_file = "game/static/technology/mapping.json"
data_file = "game/static/technology/data.json"


class TechnologyManager(InheritanceManager):
    with open(mapping_file) as file:
        _mapping = json.load(file)
    with open(data_file) as file:
        _data = json.load(file)

    @property
    def mapping(self):
        return self._mapping

    @property
    def data(self):
        return self._data

    def create_technology(self, player, class_idx):
        """Create a technology instance for player.

        Args:
            player: Player instance, to which link the new building instance.
            class_idx: int, id of the technology class to instantiate.

        Return:
            new_technology: the newly created Technology instance.
        """
        class_name = self.mapping[str(class_idx)]
        data = self.data[str(class_idx)]
        related_domain = player.domains.get(domain_idx=data["domain_idx"])

        # create the technology instance with the corresponding subclass
        new_technology = getattr(sys.modules[__name__], class_name).objects.create(
            class_idx=class_idx, domain=related_domain,
        )

        # create related cost instances
        for level in range(1, new_technology.max_level + 1):
            TechnologyCost.objects.create(
                technology=new_technology,
                level=level,
                cost=data["level_costs"][str(level)],
            )

        # trigger all passive effects
        for building in player.buildings.all().select_subclasses():
            building.effect_on_building_unlocking(new_technology)
        for technology in player.technologies.exclude(
            id=new_technology.id
        ).select_subclasses():
            technology.effect_on_building_unlocking(new_technology)

        return new_technology


class TechnologyCost(models.Model):
    technology = models.ForeignKey(
        "Technology", on_delete=models.CASCADE, related_name="level_costs"
    )
    level = models.IntegerField()
    cost = models.FloatField()


# TODO?: add a constraint which enforce/checks current_level <= max_level
class Technology(BaseModel):
    # ManyToMany ? maybe later
    domain = models.ForeignKey(
        "TechnologyDomain", on_delete=models.CASCADE, related_name="technologies"
    )
    class_idx = models.IntegerField(editable=False)  # editable=False ?
    current_level = models.IntegerField(default=0)

    objects = TechnologyManager()

    # TODO?: vv
    # class Meta:
    #     # each technology class should be unique for each player
    #     constraints = [
    #         models.UniqueConstraint(
    #             fields=["domain__player", "class_idx"], name="technology_unique"
    #         )
    #     ]

    @property
    def player(self):
        """Return the player owner of the technology"""
        return self.domain.player

    @property
    def data(self):
        """Return the static data of the technology."""
        return Technology.objects.data[str(self.class_idx)]

    @property
    def max_level(self):
        """Return the number of levels of the technology"""
        return self.data.get("max_level", 1)

    @property
    def next_level_cost(self):
        """Return the science cost to develop the technology."""
        return self.level_costs.get(level=self.current_level + 1).cost

    @property
    def child_technologies_indices(self):
        return self.data.get("child_technologies", [])

    def develop(self):
        """Develop one level of the technology."""
        assert (
            self.current_level < self.max_level
        ), "This technology is already fully developed"

        self.current_level += 1
        self.save()
        self._unlock_children()
        self._unlock_buildings()
        self._update_buildings()
        self.special_effect()

        # trigger on-develop effects
        for technology in self.player.technologies.exclude(id=self.id):
            technology.effect_on_technology_development(self)
        for building in self.player.buildings.all():
            building.effect_on_technology_development(self)

    def _unlock_children(self):
        """Create the child_technologies instances if they don't exist yet."""
        for idx in self.child_technologies_indices:
            if Technology.objects.filter(class_idx=idx).count() == 0:
                Technology.objects.create_technology(
                    player=self.domain.player, class_idx=idx
                )

    def _unlock_buildings(self):
        """Create new Building instances according to current tech level effect."""
        new_buildings = self._get_new_buildings(level=self.current_level)
        for building_idx in new_buildings:
            Building.objects.unlock_building(player=self.player, class_idx=building_idx)

    def _update_buildings(self):
        """Update buildings according to current tech level effect."""
        buildings_to_update = self._get_updated_buildings(self.current_level)
        for building_data in buildings_to_update:
            building = self.domain.player.buildings.get(
                class_idx=building_data["class_idx"]
            )
            building.update(building_data)

    def _get_new_buildings(self, level):
        """Return data of all new buildings unlocked by this tech at level 'level'."""
        return (
            self.data.get("level_effects", {})
            .get(str(level), {})
            .get("unlocked_buildings", [])
        )

    def _get_updated_buildings(self, level):
        """Return data of all new buildings updated by this tech at level 'level'."""
        return (
            self.data.get("level_effects", {})
            .get(str(level), {})
            .get("updated_buildings", [])
        )

    def special_effect(self):
        """Trigger the special effect of current tech level."""
        # print("SPECIAL EFFECT o.O")
        pass

    def __str__(self):
        return f"level {self.current_level}/{self.max_level}"


class BasicBuildings(Technology):
    # def special_effect(self):
    #     print("Basic buildings did something")
    pass


class IntensiveFarming(Technology):
    # def special_effect(self):
    #     print("Intensive farming did something")
    pass


class MoreFactories(Technology):
    # def special_effect(self):
    #     print("More factories did something")
    pass
