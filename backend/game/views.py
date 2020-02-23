from rest_framework import viewsets
from game.models import Game, Player
from game.serializers import GameSerializer, PlayerSerializer
from game.permissions import IsNotAlreadyInGameOrReadOnly


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsNotAlreadyInGameOrReadOnly]
