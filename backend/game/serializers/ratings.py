from rest_framework import serializers
from game.models import PlayerRatings, BuildingRatings

common_fields = ["economy", "society", "environment"]
common_read_only_fields = ["economy", "society", "environment"]


class PlayerRatingsSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField(method_name="get_score")

    class Meta:
        model = PlayerRatings
        fields = common_fields + ["score"]
        read_only_fields = common_read_only_fields

    def get_score(self, ratings):
        return ratings.score


class BuildingRatingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingRatings
        fields = common_fields
        read_only_fields = common_read_only_fields
