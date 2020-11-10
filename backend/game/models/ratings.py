from django.db import models


class BaseRatings(models.Model):
    economy = models.FloatField(default=0)
    society = models.FloatField(default=0)
    environment = models.FloatField(default=0)

    class Meta:
        abstract = True


class PlayerRatings(BaseRatings):
    player = models.OneToOneField(
        "Player", on_delete=models.CASCADE, related_name="ratings"
    )

    @property
    def score(self):
        return sum(
            [
                ((index + 1) * value)
                for (index, value) in enumerate(
                    sorted([self.economy, self.society, self.environment], reverse=True)
                )
            ]
        )

    def add(self, other):
        self.economy += other.economy
        self.society += other.society
        self.environment += other.environment
        self.save()


class BuildingRatings(BaseRatings):
    building = models.OneToOneField(
        "Building", on_delete=models.CASCADE, related_name="ratings"
    )
