from rest_framework import viewsets
from game.models import Game, Player
from game.serializers import GameSerializer, PlayerSerializer


# TODO: crete a view folder ?
class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
