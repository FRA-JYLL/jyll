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
                ((idx + 1) * value)
                for (idx, value) in enumerate(
                    sorted([self.economy, self.society, self.environment], reverse=True)
                )
            ]
        )
