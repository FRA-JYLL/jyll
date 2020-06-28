from django.db import models


class Resources(models.Model):
    player = models.OneToOneField("Player", on_delete=models.CASCADE)

    money = models.FloatField(default=0)
    hydrocarbon = models.FloatField(default=0)
