from rest_framework import serializers

from .models import *
from hashid_field.rest import HashidSerializerCharField


class PageSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Page.id', read_only=True)
    book = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(source_field='zubdarg.Book.id'),
        queryset=Book.objects.all())

    class Meta:
        model = Page
        fields = ('id', 'number', 'text', 'book')


class SourceSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Source.id', read_only=True)

    class Meta:
        model = Source
        fields = ('id', 'name')


class BooksListSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Book.id', read_only=True)
    sources = SourceSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'summary', 'isbn', 'publication_date', 'sources')


class BookSerializer(BooksListSerializer):
    pages = PageSerializer(many=True, read_only=True, source='page_set')

    class Meta:
        model = Book
        fields = ('id', 'title', 'summary', 'isbn', 'publication_date', 'sources', 'pages')


class BookCreateSerializer(serializers.ModelSerializer):
    pages = serializers.ListField(write_only=True)
    sources = serializers.ListField(write_only=True)
    id = HashidSerializerCharField(source_field='zubdarg.Book.id', read_only=True)

    def create(self, validated_data):
        pages_data = validated_data.pop('pages')
        sources_data = validated_data.pop('sources')

        title = validated_data.pop('title', None)

        if title is None:
            raise serializers.ValidationError('Title is required')

        book_data = {
            'title': title,
            'summary': validated_data.pop('summary'),
            'isbn': validated_data.pop('isbn'),
            'publication_date': validated_data.pop('publication_date')
        }
        book = Book.objects.create(**book_data)

        for page_data in pages_data:
            page_data = {
                'number': page_data['number'],
                'text': page_data['text'],
                'book': book
            }
            Page.objects.create(**page_data)

        for source_data in sources_data:
            source_data = {
                'name': source_data,
                'book': book
            }
            Source.objects.create(**source_data)

        return book

    class Meta:
        model = Book
        fields = '__all__'


