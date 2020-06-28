from rest_framework import serializers
from game.models import Resources


class ResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resources
        fields = ["money", "hydrocarbon"]
        read_only_fields = ["money", "hydrocarbon"]
