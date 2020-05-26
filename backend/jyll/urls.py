from django.contrib import admin
from django.urls import include, path
from users import urls as users_urls
from game import urls as game_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(users_urls)),
    path("api/", include(game_urls)),
]
