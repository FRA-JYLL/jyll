from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):

    def create_user(self, username, password=None):
        """
        Creates and saves a User with the given username and password.
        """
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(username=username)

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
