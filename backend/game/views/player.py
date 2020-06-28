from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from game.models import Player
from game.serializers import (
    PlayerSerializer,
    PlayerRatingsSerializer,
    PlayerProductionSerializer,
    ResourcesSerializer,
)
from game.tasks import start_game
from rest_framework.exceptions import PermissionDenied


class PlayerViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    """This viewset provides `retrieve` and `update` actions for the player model."""

    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        player = self.get_object()

        # the player should be controlled by the right user
        if request.user != player.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        serializer = self.get_serializer(player, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        # Run the game setup in background if all players are ready
        if player.game.are_all_players_ready():
            start_game.delay(player.game.id)

        if getattr(player, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the player instance.
            player._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def full(self, request, *args, **kwargs):
        """View to retrieve the full player, with his production, ratings, and resources"""
        # query the player
        player = self.get_object()

        # check that the requesting user controls a player in the requested game
        if player.game.players.filter(user=request.user).first() is None:
            raise PermissionDenied(detail="You are not playing in this game")

        serializer = self.get_serializer(player)

        resources = ResourcesSerializer(player.resources).data
        ratings = PlayerRatingsSerializer(player.ratings).data
        production = PlayerProductionSerializer(player.production).data

        return Response(
            dict(
                **serializer.data,
                production=production,
                ratings=ratings,
                resources=resources,
            )
        )
