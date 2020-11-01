# Generated by Django 3.0.2 on 2020-06-30 10:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("game", "0005_add_building_model"),
    ]

    operations = [
        migrations.CreateModel(
            name="Technology",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_unlocked", models.BooleanField(default=False)),
                ("class_idx", models.IntegerField()),
                ("current_level", models.IntegerField(default=0)),
                ("max_level", models.IntegerField(default=1)),
                ("cost", models.FloatField()),
                (
                    "child_technologies",
                    models.ManyToManyField(blank=True, to="game.Technology"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BasicBuildings",
            fields=[
                (
                    "technology_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="game.Technology",
                    ),
                ),
            ],
            bases=("game.technology",),
        ),
        migrations.CreateModel(
            name="IntensiveFarming",
            fields=[
                (
                    "technology_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="game.Technology",
                    ),
                ),
            ],
            bases=("game.technology",),
        ),
        migrations.CreateModel(
            name="MoreFactories",
            fields=[
                (
                    "technology_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="game.Technology",
                    ),
                ),
            ],
            bases=("game.technology",),
        ),
        migrations.CreateModel(
            name="TechnologyDomain",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("domain_idx", models.IntegerField()),
                (
                    "next_technology_class_id",
                    models.IntegerField(blank=True, null=True),
                ),
                ("science_points", models.FloatField(default=0)),
                (
                    "player",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="domains",
                        to="game.Player",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="technology",
            name="domain",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="technologies",
                to="game.TechnologyDomain",
            ),
        ),
        migrations.AddConstraint(
            model_name="technologydomain",
            constraint=models.UniqueConstraint(
                fields=("player", "domain_idx"), name="domain_unique"
            ),
        ),
    ]