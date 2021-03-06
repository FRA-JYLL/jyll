# Generated by Django 3.0.2 on 2020-07-03 12:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("game", "0007_farm_refinery"),
    ]

    operations = [
        migrations.RemoveField(model_name="technology", name="child_technologies",),
        migrations.RemoveField(model_name="technology", name="cost",),
        migrations.RemoveField(model_name="technology", name="is_unlocked",),
        migrations.RemoveField(model_name="technology", name="max_level",),
        migrations.AlterField(
            model_name="building",
            name="player",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buildings",
                to="game.Player",
            ),
        ),
        migrations.AlterField(
            model_name="buildingproduction",
            name="building",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="production",
                to="game.Building",
            ),
        ),
        migrations.AlterField(
            model_name="buildingratings",
            name="building",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="ratings",
                to="game.Building",
            ),
        ),
        migrations.AlterField(
            model_name="technology",
            name="class_idx",
            field=models.IntegerField(editable=False),
        ),
    ]
