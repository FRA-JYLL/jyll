from rest_framework import serializers
from game.models import PlayerProduction


class PlayerProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerProduction
        fields = [
            "money",
            "hydrocarbon",
            "hydrocarbon_consumption",
            "food",
            "electricity",
            "waste",
            "pollution",
            "science",
        ]
        read_only_fields = [
            "money",
            "hydrocarbon",
            "hydrocarbon_consumption",
            "food",
            "electricity",
            "waste",
            "pollution",
            "science",
        ]
