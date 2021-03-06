from rest_framework import serializers
from game.models import TechnologyDomain


class TechnologyDomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechnologyDomain
        fields = ["domain_index", "next_technology_class_index", "science_points"]
        read_only_fields = [
            "domain_index",
            "next_technology_class_index",
            "science_points",
        ]
