from rest_framework import permissions

SAFE_METHODS = ("POST", "HEAD", "OPTIONS")


class IsAuthenticatedOrWriteOnly(permissions.BasePermission):
    """
    Custom permission to only allow authenticated users to list or retrieve users.
    """

    def has_permission(self, request, view):
        return bool(
            request.method in SAFE_METHODS
            or request.user
            and request.user.is_authenticated
        )
