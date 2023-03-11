from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.db import models
from hashid_field import HashidAutoField


class Author(models.Model):
    id = HashidAutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    id = HashidAutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Genre(models.Model):
    id = HashidAutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Source(models.Model):
    id = HashidAutoField(primary_key=True)
    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Document(models.Model):
    id = HashidAutoField(primary_key=True)
    title = models.CharField(max_length=500, null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    genres = models.ManyToManyField(Genre, blank=True)
    authors = models.ManyToManyField(Author, blank=True)
    sources = models.ManyToManyField(Source, blank=True)
    publisher = models.ManyToManyField(Publisher, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        abstract = True

class Page(models.Model):
    id = HashidAutoField(primary_key=True)
    number = models.IntegerField()
    text = models.TextField()
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    document = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f"{self.document.title} - {self.number}"

    class Meta:
        indexes = [
            models.Index(fields=["content_type", "object_id"]),
        ]


class Book(Document):
    isbn = models.CharField(max_length=255, null=True, blank=True)
    pages = GenericRelation(Page, related_query_name='book')

class Article(Document):
    volume = models.CharField(max_length=255, null=True, blank=True)
    pages = GenericRelation(Page, related_query_name='article')
