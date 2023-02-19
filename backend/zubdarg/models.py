from django.db import models
from hashid_field import HashidField, HashidAutoField


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


class Book(models.Model):
    id = HashidAutoField(primary_key=True)
    title = models.CharField(max_length=500, null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    isbn = models.CharField(max_length=255, null=True, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    genres = models.ManyToManyField(Genre, blank=True)
    authors = models.ManyToManyField(Author, blank=True)
    publisher = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title


class Page(models.Model):
    id = HashidAutoField(primary_key=True)
    number = models.IntegerField()
    text = models.TextField()
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.book.title} - {self.number}"
