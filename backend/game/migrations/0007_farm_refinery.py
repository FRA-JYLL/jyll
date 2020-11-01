# Generated by Django 3.0.2 on 2020-06-30 11:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("game", "0006_add_technology_models"),
    ]

    operations = [
        migrations.CreateModel(
            name="Farm",
            fields=[
                (
                    "building_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="game.Building",
                    ),
                ),
            ],
            bases=("game.building",),
        ),
        migrations.CreateModel(
            name="Refinery",
            fields=[
                (
                    "building_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="game.Building",
                    ),
                ),
            ],
            bases=("game.building",),
        ),
    ]