from rest_framework import viewsets, status, mixins
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from game.models import Game
from game.serializers import GameSerializer


class GameViewSet(mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Call custom manager
        Game.objects.create(creator=request.user,
                            name=serializer.data.get('name'),
                            password=serializer.data.get('password'))

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PendingGamesViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """ViewSet listing all pending games"""
    queryset = Game.objects.filter(is_pending=True)
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]


class GamesWithUserViewSet(viewsets.GenericViewSet):
    """ViewSet listing all games in which the requesting user controls a player"""
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        # query all games with requesting user
        queryset = self.filter_queryset(Game.objects.with_user(request.user.id))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
