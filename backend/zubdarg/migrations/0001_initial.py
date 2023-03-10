# Generated by Django 4.1.7 on 2023-03-11 19:08
from django.contrib.postgres.operations import TrigramExtension
from django.db import migrations, models
import django.db.models.deletion
import hashid_field.field


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('contenttypes', '0002_remove_content_type_name'),
    ]

    operations = [
        TrigramExtension(),
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Publisher',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('number', models.IntegerField()),
                ('text', models.TextField()),
                ('object_id', models.PositiveIntegerField()),
                ('content_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='contenttypes.contenttype')),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=500, null=True)),
                ('summary', models.TextField(blank=True, null=True)),
                ('publication_date', models.DateField(blank=True, null=True)),
                ('isbn', models.CharField(blank=True, max_length=255, null=True)),
                ('authors', models.ManyToManyField(blank=True, to='zubdarg.author')),
                ('genres', models.ManyToManyField(blank=True, to='zubdarg.genre')),
                ('publisher', models.ManyToManyField(blank=True, to='zubdarg.publisher')),
                ('sources', models.ManyToManyField(blank=True, to='zubdarg.source')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', hashid_field.field.HashidAutoField(alphabet='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', min_length=20, prefix='', primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, max_length=500, null=True)),
                ('summary', models.TextField(blank=True, null=True)),
                ('publication_date', models.DateField(blank=True, null=True)),
                ('volume', models.CharField(blank=True, max_length=255, null=True)),
                ('authors', models.ManyToManyField(blank=True, to='zubdarg.author')),
                ('genres', models.ManyToManyField(blank=True, to='zubdarg.genre')),
                ('publisher', models.ManyToManyField(blank=True, to='zubdarg.publisher')),
                ('sources', models.ManyToManyField(blank=True, to='zubdarg.source')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AddIndex(
            model_name='page',
            index=models.Index(fields=['content_type', 'object_id'], name='zubdarg_pag_content_1ea265_idx'),
        ),
    ]
