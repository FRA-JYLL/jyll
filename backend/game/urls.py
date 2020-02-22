from django.urls import include, path
from rest_framework.routers import DefaultRouter
from game.views import GameViewSet, PlayerViewSet

# The router handles the creation of generic API urls such as `users/` or `users/<int:pk>/`,
# as well as the root url
router = DefaultRouter()
router.register(r'game', GameViewSet)
router.register(r'player', PlayerViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
