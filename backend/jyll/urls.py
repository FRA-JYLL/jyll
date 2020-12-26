from django.contrib import admin
from django.urls import include, path
from users import urls as users_urls
from game import urls as game_urls
from rest_framework.routers import DefaultRouter

# This router links other apps routers and creates the root view
router = DefaultRouter()
router.registry.extend(users_urls.router.registry)
router.registry.extend(game_urls.router.registry)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(users_urls)),
    path("api/", include(router.urls)),
    path("silk/", include("silk.urls", namespace="silk")),
]
