from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from game.models import Game, Player


class UserManager(BaseUserManager):

    def create_user(self, username, password=None):
        """
        Creates and saves a User with the given username and password.
        """
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(username=username)

        # Users are logged in on account creation
        user.last_login = timezone.now()
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password=None):
        """
        Creates and saves a superuser with the given username and password.
        """
        user = self.create_user(
            username,
            password=password,
        )
        # make this user a superuser
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """ Model used for authentication """

    username = models.CharField(max_length=42, unique=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'

    objects = UserManager()  # linking to custom UserManager

    def __str__(self):
        return self.username

    @property
    def is_staff(self):
        """ Is the user a member of staff (i.e. has access to admin)? """
        # Superusers are staff members
        return self.is_superuser

    def create_game(self, name=None):
        """ create a new game and become admin """
        if name is None:
            name = str(self.username) + "'s game"
        new_game = Game.objects.create(creator=self, name=name)
        return new_game

    def join_game(self, game):
        """ Join an already created game """
        if game.players.filter(user__username=self.username):
            print('User already controls a player in this game !')
            return
        new_player = Player.objects.create(game=game, user=self)
        return new_player
