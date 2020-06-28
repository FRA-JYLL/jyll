from rest_framework import serializers
from game.models import Player


class PlayerSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField(method_name="get_username")

    class Meta:
        model = Player
        fields = ["id", "is_admin", "user", "game", "is_ready", "username"]
        read_only_fields = ["is_admin", "user", "game"]

    def get_username(self, player):
        return player.user.username
