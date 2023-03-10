# Generated by Django 4.1.7 on 2023-03-11 19:08

from django.db import migrations, models
import hashid_field.field


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Version',
            fields=[
                ('id', hashid_field.field.BigHashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', auto_created=True, min_length=13, prefix='', primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Words',
            fields=[
                ('id', hashid_field.field.BigHashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', auto_created=True, min_length=13, prefix='', primary_key=True, serialize=False, verbose_name='ID')),
                ('word', models.CharField(max_length=200)),
                ('description', models.TextField()),
            ],
            options={
                'unique_together': {('word', 'description')},
            },
        ),
    ]
