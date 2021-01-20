from django.db import models
from .resources import Resources
from .ratings import PlayerRatings
from .technology import Technology
from .production import PlayerProduction
from .building import ScienceBuildingCopy
from .technology_domain import TechnologyDomain


class PlayerManager(models.Manager):
    """ Custom manager for Player, overwrites create method """

    def create(self, game, user, is_admin=False):
        # check if user is already in game
        assert not game.players.filter(user__username=user.username), (
            user.username + " already controls a player in this game !"
        )

        # if is_admin is set to True check that game is empty (i.e. there is no admin yet)
        if is_admin:
            assert game.players.count() == 0, "There is already an admin in this game"

        # Create new player
        new_player = super().create(game=game, user=user, is_admin=is_admin)

        # create associated resources, production, and ratings
        Resources.objects.create(player=new_player)
        PlayerRatings.objects.create(player=new_player)
        PlayerProduction.objects.create(player=new_player)
        TechnologyDomain.objects.initialize_technology_tree(player=new_player)

        return new_player


class Player(models.Model):
    game = models.ForeignKey("Game", related_name="players", on_delete=models.CASCADE)
    # user controlling the player
    user = models.ForeignKey(
        "users.User", related_name="players", on_delete=models.CASCADE
    )
    is_admin = models.BooleanField(default=False)

    # tells if the player is ready before game start, and tells if the player has finished the current generation
    is_ready = models.BooleanField(default=False)

    objects = PlayerManager()  # link to custom manager

    @property
    def technologies(self):
        return Technology.objects.filter(domain__player=self)

    @property
    def science_buildings(self):
        return ScienceBuildingCopy.objects.filter(building__player=self)

    def run_income(self):
        """Player income phase."""
        # money income
        self.resources.money += self.production.money
        # hydrocarbon income
        multiplier = self.game.hydrocarbon_supply.multiplier
        self.resources.hydrocarbon += (
            self.production.hydrocarbon * multiplier
            - self.production.hydrocarbon_consumption
        )
        # save changes
        self.resources.save()

        for domain in self.domains.all():
            domain.run_science_income()

    def run_turn(self, turn):
        """Run player turn."""
        # building actions
        for action in turn.building_actions:
            building = self.buildings.get(class_index=action.class_index)
            if action.type == BuildingAction.build_action:
                for _ in range(action.copies):
                    building.build()
            elif action.type == BuildingAction.close_action:
                raise NotImplementedError()
        # science focuses
        for focus in turn.science_focuses:
            new_domain_focus = self.domains.get(domain_index=focus.domain_index)
            building = self.science_buildings.get(id=focus.building_copy_id)
            building.set_focus(new_domain_focus)

        # end of turn ready for next turn, and waiting for other players to finish
        self.is_ready = True
        self.save()

    def __str__(self):
        return self.user.username


class BuildingAction:
    build_action = "BUILD"
    close_action = "CLOSE"

    def __init__(self, class_index, type, copies):
        self.class_index = class_index
        self.type = type
        self.copies = copies


class ScienceFocus:
    def __init__(self, building_copy_id, domain_index):
        self.building_copy_id = building_copy_id
        self.domain_index = domain_index


class PlayerTurn:
    def __init__(self, building_actions, science_focuses):
        self.building_actions = [
            BuildingAction(**action) for action in building_actions
        ]
        self.science_focuses = [ScienceFocus(**focus) for focus in science_focuses]
