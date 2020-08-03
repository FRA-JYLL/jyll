from rest_framework import serializers
from game.models import Game


class GameSerializer(serializers.ModelSerializer):
    has_password = serializers.SerializerMethodField(method_name="get_has_password")

    class Meta:
        model = Game
        fields = [
            "id",
            "name",
            "is_pending",
            "password",
            "creation_date",
            "has_password",
            "generation",
        ]
        read_only_fields = ["is_pending", "creation_date", "generation"]
        extra_kwargs = {"password": {"write_only": True}, "name": {"required": False}}

    def get_has_password(self, game):
        return game.password is not None
