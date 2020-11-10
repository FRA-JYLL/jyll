from rest_framework import serializers
from game.models import Building, ScienceBuilding


class BuildingSerializer(serializers.ModelSerializer):
    domains_focused_on = serializers.SerializerMethodField(
        method_name="get_domains_focused_on"
    )

    class Meta:
        model = Building
        fields = [
            "class_index",
            "quantity_cap",
            "cost",
            "copies",
            "production",
            "ratings",
            "domains_focused_on",
        ]
        depth = 1
        read_only_fields = [
            "class_index",
            "quantity_cap",
            "cost",
            "copies",
            "production",
            "ratings",
            "domains_focused_on",
        ]

    def get_domains_focused_on(self, building):
        sub_building = (
            Building.objects.filter(id=building.id).select_subclasses().first()
        )
        if not issubclass(type(sub_building), ScienceBuilding):
            return None
        # else
        res = {}
        for index, copy in enumerate(sub_building.individual_copies.all()):
            if copy.domain_focus is not None:
                res[index] = copy.domain_focus.domain_index
            else:
                res[index] = None

        return res
