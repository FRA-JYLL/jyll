from rest_framework import viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from game.models import Game, Player
from game.serializers import PlayerSerializer
from users.models import User


class PlayerViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.DestroyModelMixin,
                    mixins.ListModelMixin,
                    viewsets.GenericViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        game = Game.objects.get(id=serializer.data.get('game'))

        headers = self.get_success_headers(serializer.data)

        # Check if user doesn't already control a player in this game
        if game.players.filter(user__username=request.user.username):
            return Response(serializer.data, status=status.HTTP_403_FORBIDDEN, headers=headers)

        # else
        Player.objects.create(user=request.user, game=game)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
