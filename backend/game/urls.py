from rest_framework.routers import SimpleRouter
from game.views import GameViewSet, PlayerViewSet

# The router handles the creation of generic API urls, such as `game/` or `game/<int:pk>/`
router = SimpleRouter()
router.register(r"game", GameViewSet)
router.register(r"player", PlayerViewSet)
