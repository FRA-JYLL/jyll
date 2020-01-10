from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    """ Custom manager for User model """

    def create_user(self, username, password=None):
        """
        Creates and saves a User with the given username and password.
        """
        if not username:
            raise ValueError('Users must have an username')

        user = self.model(username=username)

        user.set_password(password)
        user.save()  # using=self._db ??
        return user

    def create_superuser(self, username, password=None):
        """
        Creates and saves a superuser with the given username and password.
        """
        user = self.create_user(
            username,
            password=password,
        )
        # make this user part of admin and superuser
        user.is_admin = True
        user.is_superuser = True
        user.save()  # using=self._db ??
        return user


class User(AbstractBaseUser, PermissionsMixin):
    """ Custom User model """

    username = models.CharField(max_length=42, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    #email = model.EmailField()

    USERNAME_FIELD = 'username'
    #EMAIL_FIELD = email

    objects = UserManager()  # linking to custom manager

    def __str__(self):
        return self.username

    @property
    def is_staff(self):
        """ Is the user a member of staff (i.e. has access to admin)? """
        # Admins are staff members
        return self.is_admin
