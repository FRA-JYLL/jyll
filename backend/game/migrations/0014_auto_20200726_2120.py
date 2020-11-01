# Generated by Django 3.0.2 on 2020-07-26 19:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("game", "0013_science_building_copy_model"),
    ]

    operations = [
        migrations.AddField(
            model_name="game", name="generation", field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name="building",
            name="quantity_cap",
            field=models.IntegerField(default=0),
        ),
    ]