from django.urls import path
from users.views import UserViewSet, LoginView
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt import views as jwt_views

# The router handles the creation of generic API urls such as `users/` or `users/<int:pk>/`
router = SimpleRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    # Use this view to obtain a new pair of access/refresh tokens
    path("auth/login/", LoginView.as_view(), name="login"),
    # Use this view when an access token expires
    path("auth/refresh/", jwt_views.TokenRefreshView.as_view(), name="refresh"),
]
