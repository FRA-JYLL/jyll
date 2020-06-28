from rest_framework import serializers
from game.models import HydrocarbonSupply


class HydrocarbonSupplySerializer(serializers.ModelSerializer):
    multiplier = serializers.SerializerMethodField(method_name="get_multiplier")

    class Meta:
        model = HydrocarbonSupply
        fields = ["drawn_amount", "multiplier"]
        read_only_fields = ["drawn_amount"]

    def get_multiplier(self, supply):
        return supply.multiplier
