from rest_framework import serializers
from game.models import Technology


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ["class_idx", "current_level", "domain", "level_costs"]
        depth = 1
        read_only_fields = ["class_idx", "current_level", "domain", "level_costs"]
