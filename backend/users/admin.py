from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = CustomUser
    list_display = ['username']

    # We only use username and password for user authentication
    fieldsets = (
        (('User'), {'fields': ('username', 'password')}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
