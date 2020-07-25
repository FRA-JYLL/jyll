from rest_framework import serializers
from game.models import PlayerProduction, BuildingProduction

common_fields = [
    "money",
    "hydrocarbon",
    "hydrocarbon_consumption",
    "food",
    "electricity",
    "waste",
    "pollution",
    "science",
]

common_read_only_fields = [
    "money",
    "hydrocarbon",
    "hydrocarbon_consumption",
    "food",
    "electricity",
    "waste",
    "pollution",
    "science",
]


class PlayerProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerProduction
        fields = common_fields
        read_only_fields = common_read_only_fields


class BuildingProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingProduction
        fields = common_fields
        read_only_fields = common_read_only_fields
