# Generated by Django 4.2 on 2023-05-07 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('yatapp', '0002_alter_profile_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
