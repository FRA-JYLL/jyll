from rest_framework import serializers

from game.models import Player, BuildingAction


class BuildingActionSerializer(serializers.Serializer):
    """Building action serializer.

    Attr:
        class_index: index of the building sub-class
        action: type of action (build or close the building)
        copies: number of this action is done
    """

    class_index = serializers.IntegerField()
    type = serializers.ChoiceField(
        choices=[BuildingAction.build_action, BuildingAction.close_action],
        default=BuildingAction.build_action,
    )
    copies = serializers.IntegerField(default=1)

    def validate_copies(self, copies):
        assert copies != 0
        return copies


class ScienceFocusSerializer(serializers.Serializer):
    """Science focus serializer.

    Attr:
        building_copy_id: id of the ScienceBuildingCopy
        domain_index: index of the domain to focus on
    """

    building_copy_id = serializers.IntegerField()
    domain_index = serializers.IntegerField()


class PlayerTurnSerializer(serializers.Serializer):
    """Player turn serializer, includes all the infos to perform a player turn."""

    building_actions = serializers.ListField(child=BuildingActionSerializer())
    science_focuses = serializers.ListField(child=ScienceFocusSerializer())

    def validate(self, data):
        player_id = self.context.get("player_id")

        if player_id is None:
            raise serializers.ValidationError(
                "The player id should be given in context."
            )
        player = Player.objects.get(id=player_id)

        # check building actions
        for action in data.get("building_actions", []):
            class_index = action["class_index"]
            # check that this building already exists for this player
            if player.buildings.filter(class_index=class_index).count() == 0:
                raise serializers.ValidationError(
                    f"The building {class_index} does not exist."
                )

        # check science focuses
        for focus in data.get("science_focuses", []):
            building_copy_id = focus["building_copy_id"]
            # check that this id exists
            if player.science_buildings.filter(id=building_copy_id).count() == 0:
                raise serializers.ValidationError(
                    f"The building copy {building_copy_id} does not exist."
                )
            domain_index = focus["domain_index"]
            # check that the domain exists
            if player.domains.filter(domain_index=domain_index).count() == 0:
                raise serializers.ValidationError(
                    f"The domain {domain_index} does not exist."
                )

        return data
