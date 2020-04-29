from rest_framework import viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from game.models import Game, Player
from game.serializers import GameSerializer
from rest_framework.decorators import action


class GameViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        """Overwrite create method of CreateModelMixin"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Call custom manager
        Game.objects.create(creator=request.user,
                            name=serializer.validated_data.get('name'),
                            password=serializer.validated_data.get('password'))

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def _get_serializer(self, queryset):
        """Get queryset and return the corresponding serializer"""
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return serializer

    @action(detail=False, methods=['get'])
    def pending(self, request, *args, **kwargs):
        """View listing all pending games"""
        # query all pending games
        queryset = self.filter_queryset(Game.objects.filter(is_pending=True))

        serializer = self._get_serializer(queryset)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def with_user(self, request, *args, **kwargs):
        """View listing all games with the user requesting"""
        # query all games with requesting user
        queryset = self.filter_queryset(Game.objects.with_user(request.user.id))

        serializer = self._get_serializer(queryset)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def join(self, request, *args, **kwargs):
        """View to join a specific pending game, giving a password if required"""
        # query the game to join
        game = self.get_object()

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        headers = self.get_success_headers(serializer.data)

        # the game should be pending, the requesting user should not already control a player in the game,
        # and should give a correct password
        if not game.is_pending or game.players.filter(user__username=request.user.username) or \
                (game.password is not None and serializer.validated_data.get('password') != game.password):
            return Response(serializer.data, status=status.HTTP_403_FORBIDDEN, headers=headers)

        # create a new player in game controlled by user
        Player.objects.create(game=game, user=request.user)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['delete'])
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

    @action(detail=True, methods=['get'])
    def players(self, request, *args, **kwargs):
        """View to list players in game"""
        # query the game
        game = self.get_object()

        # get players in games
        queryset = game.players.all()

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
