from rest_framework import serializers
from game.models import Game, Player


# TODO: create serializer folder ?
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name', 'is_pending', 'password', 'creation_date']
        read_only_fields = ['is_pending']
        extra_kwargs = {'password': {'write_only': True}}


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'is_admin', 'user', 'game']  # 'game__id',
