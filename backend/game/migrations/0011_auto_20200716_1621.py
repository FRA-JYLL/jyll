# Generated by Django 3.0.2 on 2020-07-16 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("game", "0010_lab_domain_focus"),
    ]

    operations = [
        migrations.RenameField(
            model_name="technologydomain",
            old_name="next_technology_class_id",
            new_name="next_technology_class_idx",
        ),
    ]
