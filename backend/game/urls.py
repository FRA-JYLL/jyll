from django.urls import include, path
from rest_framework.routers import DefaultRouter
from game.views import GameViewSet, PlayerViewSet, PendingGamesViewSet, GamesWithUserViewSet

# The router handles the creation of generic API urls as well as the root url
router = DefaultRouter()
router.register(r'game', GameViewSet)
router.register(r'player', PlayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('pending-games/', PendingGamesViewSet.as_view({'get': 'list'}), name='pending-games'),
    path('games-with-user/', GamesWithUserViewSet.as_view({'get': 'list'}), name='games-with-user'),
]
