from rest_framework import serializers
from game.models import Game, Player


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
        ]
        read_only_fields = ["is_pending", "creation_date", "has_password"]
        extra_kwargs = {"password": {"write_only": True}, "name": {"required": False}}

    def get_has_password(self, game):
        return game.password is not None


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ["id", "is_admin", "user", "game", "is_ready"]
        read_only_fields = ["is_admin", "user", "game"]
