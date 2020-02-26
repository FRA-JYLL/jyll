from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from game.models import Game, Player
from game.serializers import GameSerializer, PlayerSerializer
from users.models import User
from django.shortcuts import get_object_or_404


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # Call custom manager
        Game.objects.create(creator=request.user, name=serializer.data.get('name'), password=serializer.data.get('password'))
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]  # , IsNotAlreadyInGameOrReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        game_id, user_id = serializer.data.get('game'), serializer.data.get('user')
        # Retrieve game and user raise a 404 if doesn't exist
        game, user = get_object_or_404(Game, pk=game_id), get_object_or_404(User, pk=user_id)

        # Check if user controls already a player in game
        if game.players.filter(user__username=user.username):
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_403_FORBIDDEN, headers=headers)

        # else
        Player.objects.create(user=user, game=game)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
