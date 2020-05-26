from django.urls import include, path
from users.views import UserViewSet, LoginView
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

# The router handles the creation of generic API urls such as `users/` or `users/<int:pk>/`, as well as the root url
router = DefaultRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    # Use this view to obtain a new pair of access/refresh tokens
    path("auth/login/", LoginView.as_view(), name="login"),
    # Use this view when an access token expires
    path("auth/refresh/", jwt_views.TokenRefreshView.as_view(), name="refresh"),
]
