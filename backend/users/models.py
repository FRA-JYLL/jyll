from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    """ Custom User model """

    # we can add new fields here

    def __str__(self):
        return self.username
