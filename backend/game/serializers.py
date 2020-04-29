from rest_framework import serializers
from game.models import Game, Player


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'name', 'is_pending', 'password', 'creation_date']
        read_only_fields = ['is_pending', 'creation_date']
        extra_kwargs = {'password': {'write_only': True}, 'name': {'required': False}}


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'is_admin', 'user', 'game', 'is_ready']
        read_only_fields = ['is_admin', 'user', 'game']
