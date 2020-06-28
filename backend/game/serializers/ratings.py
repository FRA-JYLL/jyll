from rest_framework import serializers
from game.models import PlayerRatings


class PlayerRatingsSerializer(serializers.ModelSerializer):
    score = serializers.SerializerMethodField(method_name="get_score")

    class Meta:
        model = PlayerRatings
        fields = ["economy", "society", "environment", "score"]
        read_only_fields = ["economy", "society", "environment"]

    def get_score(self, ratings):
        return ratings.score
