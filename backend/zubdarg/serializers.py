from rest_framework import serializers
from .models import *
from hashid_field.rest import HashidSerializerCharField


class BookSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Book.id', read_only=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'summary', 'isbn', 'publication_date')


class PageSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Page.id', read_only=True)
    book = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(source_field='zubdarg.Book.id'),
        queryset=Book.objects.all())

    class Meta:
        model = Page
        fields = ('id', 'number', 'text', 'book')


class BookPageSerializer(serializers.ModelSerializer):
    pages = PageSerializer(many=True, read_only=True, source='page_set')
    id = HashidSerializerCharField(source_field='zubdarg.Book.id', read_only=True)

    def create(self, validated_data):
        book_data = validated_data.pop('book')
        pages_data = validated_data.pop('pages')
        book = Book.objects.create(**book_data)
        for page_data in pages_data:
            Page.objects.create(book=book, **page_data)
        return book

    def update(self, instance, validated_data):
        book_data = validated_data.pop('book')
        pages_data = validated_data.pop('pages')
        instance.title = book_data.get('title', instance.title)
        instance.author = book_data.get('author', instance.author)
        instance.summary = book_data.get('summary', instance.summary)
        instance.isbn = book_data.get('isbn', instance.isbn)
        instance.publication_date = book_data.get('publication_date', instance.publication_date)
        instance.save()
        for page_data in pages_data:
            page = Page.objects.get(id=page_data['id'])
            page.number = page_data.get('number', page.number)
            page.text = page_data.get('text', page.text)
            page.save()
        return instance

    class Meta:
        model = Book
        fields = ('id', 'title', 'summary', 'isbn', 'publication_date', 'pages')


