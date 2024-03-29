# Generated by Django 4.1.7 on 2023-04-07 16:59

from django.db import migrations, models
import hashid_field.field


class Migration(migrations.Migration):

    dependencies = [
        ('zubdarg', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Diverse',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=500, null=True)),
                ('summary', models.TextField(blank=True, null=True)),
                ('publication_date', models.DateField(blank=True, null=True)),
                ('authors', models.ManyToManyField(blank=True, to='zubdarg.author')),
                ('genres', models.ManyToManyField(blank=True, to='zubdarg.genre')),
                ('publisher', models.ManyToManyField(blank=True, to='zubdarg.publisher')),
                ('sources', models.ManyToManyField(blank=True, to='zubdarg.source')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
