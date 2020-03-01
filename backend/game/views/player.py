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

        # Retrieve game and user, return a 404 response if at least one doesn't exist
        game_id, user_id = serializer.data.get('game'), serializer.data.get('user')
        game, user = Game.objects.get(id=game_id), User.objects.get(id=user_id)

        headers = self.get_success_headers(serializer.data)

        # Check if user doesn't already controls a player in game, and if user is the author of the request
        if game.players.filter(user__username=user.username) or request.user.id != user_id:
            return Response(serializer.data, status=status.HTTP_403_FORBIDDEN, headers=headers)

        # else
        Player.objects.create(user=user, game=game)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
