from django.db import models


class BaseModel(models.Model):
    """Abstract base class for Technology and Building models."""

    class Meta:
        abstract = True

    def effect_on_building_unlocking(self, new_building):
        pass

    def effect_on_technology_unlocking(self, new_technology):
        pass

    def effect_on_building_build(self, building):
        pass

    def effect_on_technology_development(self, technology):
        pass
