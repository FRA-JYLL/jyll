import json
from numpy.random import randint
from django.db import models
from .technology import Technology


# mapping_file = "game/static/technology_domain/mapping.json"
data_file = "game/static/technology_domain/data.json"


class TechnologyDomainManager(models.Manager):
    """Technology custom manager"""

    with open(data_file) as file:
        _data = json.load(file)

    @property
    def data(self):
        return self._data

    def initialize_technology_tree(self, player):
        """Create all TechnologyDomain instances linked to player, and all starting technologies"""
        for domain_index in self.data:
            super().create(player=player, domain_index=int(domain_index))

        for domain_index in self.data:
            # create the starting technology if there is one
            starter_technology = self.data[domain_index].get("starting_technology")
            if starter_technology is not None:
                new_technology = Technology.objects.create_technology(
                    player=player, class_index=starter_technology
                )
                new_technology.develop()

        for domain in player.domains.all():
            domain.select_next_technology()


# TODO: also add one class for each domain, to be able to implement different domain behaviours (not needed atm)
class TechnologyDomain(models.Model):
    player = models.ForeignKey(
        "Player", on_delete=models.CASCADE, related_name="domains"
    )
    domain_index = models.IntegerField()
    next_technology_class_index = models.IntegerField(
        blank=True, null=True
    )  # ForeignKey with Technology ??
    science_points = models.FloatField(default=0)

    objects = TechnologyDomainManager()

    class Meta:
        # each domain should be unique for each player
        constraints = [
            models.UniqueConstraint(
                fields=["player", "domain_index"], name="domain_unique"
            )
        ]

    def select_next_technology(self):
        """Select the next technology to develop in the domain among all available techs."""
        # retrieve techs for which the player can develop at least one level
        accessible_techs = [
            tech
            for tech in self.technologies.all()
            if tech.current_level < tech.max_level
        ]
        if len(accessible_techs) > 0:
            next_tech = accessible_techs[randint(len(accessible_techs))]
            self.next_technology_class_index = next_tech.class_index
        else:
            # all accessible techs in this domain have already been developed
            self.next_technology_class_index = None
        self.save()

    def _develop_technologies(self):
        """Unlock as many techs as science points amount allows."""
        # Nothing to do if there are no techs to develop
        if self.next_technology_class_index is None:
            return

        next_technology = self.technologies.get(
            class_index=self.next_technology_class_index
        )
        # Check if the we have enough science point to develop the next tech
        if self.science_points < next_technology.next_level_cost:
            return
        # pay the tech cost
        self.science_points -= next_technology.next_level_cost
        self.save()
        # develop it
        next_technology.develop()
        # Select a new next tech and try to develop it
        self._select_next_technology()
        self._develop_technologies()

    def run_science_income(self):
        """Update science points value, and develop as many techs as possible."""
        for building_copy in self.science_buildings.all():
            self.science_points += building_copy.building.production.science
        self.save()
        self._develop_technologies()

    def __str__(self):
        return self.player.user.username + str(self.domain_index)
