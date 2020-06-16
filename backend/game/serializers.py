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
        read_only_fields = ["is_pending", "creation_date"]
        extra_kwargs = {"password": {"write_only": True}, "name": {"required": False}}

    def get_has_password(self, game):
        return game.password is not None


class PlayerSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(method_name="get_username")

    class Meta:
        model = Player
        fields = ["id", "is_admin", "user", "game", "is_ready", "username"]
        read_only_fields = ["is_admin", "user", "game"]

    def get_username(self, player):
        return player.user.username
