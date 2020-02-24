from users.models import User
from users.serializers import UserSerializer, LoginSerializer
from users.permissions import IsAuthenticatedOrWriteOnly
from rest_framework import status
from rest_framework.response import Response
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt import views as jwt_views


class UserViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.RetrieveModelMixin,
                  viewsets.GenericViewSet):
    """ This viewset provides `list`, `create` and `retrieve` actions for the user model. """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrWriteOnly]

    def create(self, request, *args, **kwargs):
        # Default create behavior
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Add a new pair of access and refresh tokens to the response payload
        refresh_token = RefreshToken.for_user(serializer.instance)
        tokens = {
            'refresh': str(refresh_token),
            'access': str(refresh_token.access_token),
        }

        return Response({**serializer.data, **tokens}, status=status.HTTP_201_CREATED, headers=headers)


class LoginView(jwt_views.TokenObtainPairView):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """
    serializer_class = LoginSerializer
