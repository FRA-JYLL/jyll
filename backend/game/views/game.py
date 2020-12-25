from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status, mixins
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from game.models import Game, Player
from game.serializers import (
    GameSerializer,
    GameGenerationSerializer,
    PlayerSerializer,
    HydrocarbonSupplySerializer,
    PlayerTurnSerializer,
)
from game.tasks import run_player_turn


class GameViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """Overwrite create method of CreateModelMixin"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Call custom manager
        new_game = Game.objects.create(
            creator=request.user,
            name=serializer.validated_data.get("name"),
            password=serializer.validated_data.get("password"),
        )

        new_game_queryset = Game.objects.get(id=new_game.id)
        new_game_serializer = self.get_serializer(new_game_queryset)

        headers = self.get_success_headers(new_game_serializer.data)

        return Response(
            new_game_serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def _get_serializer(self, queryset):
        """Get queryset and return the corresponding serializer (cf. mixins.ListModelMixin)"""
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return serializer

    @action(detail=False, methods=["get"])
    def pending(self, request, *args, **kwargs):
        """View listing all pending games"""
        # query all pending games
        queryset = self.filter_queryset(
            Game.objects.filter(is_pending=True).exclude(
                players__user__id=request.user.id
            )
        )

        serializer = self._get_serializer(queryset)
        return Response(serializer.data)

    @action(detail=False, methods=["get"])
    def with_user(self, request, *args, **kwargs):
        """View listing all games with the user requesting"""
        # query all games with requesting user
        queryset = self.filter_queryset(Game.objects.with_user(request.user.id))

        serializer = self._get_serializer(queryset)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def join(self, request, *args, **kwargs):
        """View to join a specific pending game, giving a password if required"""
        # query the game to join
        game = self.get_object()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        headers = self.get_success_headers(serializer.validated_data)

        # the game should be pending, the requesting user should not already control a player in the game,
        # and should give a correct password
        if not game.is_pending:
            raise PermissionDenied(detail="The game you want to join is not pending")
        elif game.players.filter(user__username=request.user.username):
            raise PermissionDenied(detail="You already control a player in this game")
        elif (
            game.password is not None
            and serializer.validated_data.get("password") != game.password
        ):
            raise PermissionDenied(detail="This game requires a password")

        # create a new player in game controlled by user
        new_player = Player.objects.create(game=game, user=request.user)
        new_player_serializer = PlayerSerializer(new_player)

        return Response(
            new_player_serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    @action(detail=True, methods=["delete"])
    def leave(self, request, *args, **kwargs):
        """View to quit a game, i.e. deleting a player in the game"""
        # query the player to delete
        game = self.get_object()
        player_to_delete = game.players.get(user=request.user)

        player_to_delete.delete()

        if player_to_delete.is_admin:
            if game.players.count() > 0:
                new_admin = game.players.first()
                new_admin.is_admin = True
                new_admin.save()
            else:
                game.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["get"])
    def players(self, request, *args, **kwargs):
        """View to list players in game"""
        # query the game
        game = self.get_object()

        # get players in games
        queryset = game.players.all()

        serializer = PlayerSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def hydrocarbon_supply(self, request, *args, **kwargs):
        """View to get the hydrocarbon supply informations"""
        # query the game
        game = self.get_object()

        # check that the requesting user controls a player in the requested game
        if game.players.filter(user=request.user).first() is None:
            raise PermissionDenied(detail="You are not playing in this game")

        # serialize the hydrocarbon supply and return it
        serializer = HydrocarbonSupplySerializer(game.hydrocarbon_supply)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def my_turn(self, request, *args, **kwargs):
        """Endpoint to post the user's player turn in requested game"""
        # retrieve the game
        game = self.get_object()
        # Check that user controls a player in the game
        if game.players.filter(user=request.user).first() is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        # retrieve the player
        player = game.players.get(user=request.user)

        serializer = PlayerTurnSerializer(
            data=request.data, context={"player_id": player.id}
        )
        serializer.is_valid(raise_exception=True)

        # doesn't work
        # headers = self.get_success_headers(serializer.validated_data)

        # Run the player turn asynchronously, and launch end turn if all players have posted their turn
        run_player_turn.delay(player.id, serializer.validated_data)

        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=["get"])
    def generation(self, request, *args, **kwargs):
        """View to get the generation field only"""
        # Get the requested game id (line taken from GenericAPIView.get_object())
        lookup_url_kwarg = self.lookup_url_kwarg or self.lookup_field

        # Check that user controls a player in the game
        if (
            Player.objects.filter(
                game__id=self.kwargs[lookup_url_kwarg], user=request.user
            ).first()
            is None
        ):
            raise PermissionDenied(detail="You are not playing in this game")

        # Retrieve the game (the SQL query only asks for the `id` and `generation` fields)
        game_generation = Game.objects.only("generation").get(
            id=self.kwargs[lookup_url_kwarg]
        )
        serializer = GameGenerationSerializer(game_generation)

        return Response(serializer.data)
