from rest_framework import permissions
from game.models import Game
from users.models import User

SAFE_METHODS = ('GET', 'HEAD', 'OPTIONS')


class IsNotAlreadyInGameOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow authenticated users to list or retrieve users.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        # else
        user_id = request.data['user']
        game_id = request.data['game']

        user = User.objects.get(id=user_id)
        game = Game.objects.get(id=game_id)

        return not game.players.filter(user__username=user.username)
