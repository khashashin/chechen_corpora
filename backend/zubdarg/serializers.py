from rest_framework import serializers

from .models import *
from hashid_field.rest import HashidSerializerCharField


COMMON_FIELDS = ('title', 'summary', 'publication_date', 'genres', 'authors', 'sources', 'publisher')


class PageSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Page.id', read_only=True)

    class Meta:
        model = Page
        fields = ('id', 'number', 'text')


class SourceSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Source.id', read_only=True)

    class Meta:
        model = Source
        fields = ('id', 'name')


class GenreSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Genre.id', read_only=True)

    class Meta:
        model = Genre
        fields = ('id', 'name')


class PublisherSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Publisher.id', read_only=True)

    class Meta:
        model = Publisher
        fields = ('id', 'name')


class AuthorSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Author.id', read_only=True)

    class Meta:
        model = Author
        fields = ('id', 'name')


class BooksListSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Book.id', read_only=True)
    sources = SourceSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    publisher = PublisherSerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = ('id', 'isbn') + COMMON_FIELDS


class BookSerializer(BooksListSerializer):
    pages = PageSerializer(many=True, read_only=True)
    class Meta:
        model = Book
        fields = ('id', 'isbn') + COMMON_FIELDS + ('pages',)


def perform_nested_create(model, validated_data):
    pages_data = validated_data.pop('pages')
    genres_data = validated_data.pop('genres')
    authors_data = validated_data.pop('authors')
    publisher_data = validated_data.pop('publisher')
    sources_data = validated_data.pop('sources')

    for page in pages_data:
        page['document'] = model
        Page.objects.create(**page)

    for source_name in sources_data:
        source, created = Source.objects.get_or_create(name=source_name)
        model.sources.add(source)

    for genre_name in genres_data:
        genre, created = Genre.objects.get_or_create(name=genre_name)
        model.genres.add(genre)

    for author_name in authors_data:
        author, created = Author.objects.get_or_create(name=author_name)
        model.authors.add(author)

    for publisher_name in publisher_data:
        publisher, created = Publisher.objects.get_or_create(name=publisher_name)
        model.publisher.add(publisher)


class BaseCreateSerializer(serializers.ModelSerializer):
    pages = serializers.ListField(write_only=True)
    genres = serializers.ListField(write_only=True)
    authors = serializers.ListField(write_only=True)
    publisher = serializers.ListField(write_only=True)
    sources = serializers.ListField(write_only=True)


class BookCreateSerializer(BaseCreateSerializer):
    class Meta:
        model = Book
        fields = COMMON_FIELDS + ('isbn', 'pages')

    def create(self, validated_data):

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

        perform_nested_create(book, validated_data)

        return book


class ArticlesListSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Article.id', read_only=True)
    sources = SourceSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    publisher = PublisherSerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'volume') + COMMON_FIELDS


class ArticleSerializer(ArticlesListSerializer):
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'volume') + COMMON_FIELDS + ('pages',)


class ArticleCreateSerializer(BaseCreateSerializer):
    class Meta:
        model = Article
        fields = COMMON_FIELDS + ('volume', 'pages')

    def create(self, validated_data):

        title = validated_data.pop('title', None)

        if title is None:
            raise serializers.ValidationError('Title is required')

        article_data = {
            'title': title,
            'summary': validated_data.pop('summary'),
            'volume': validated_data.pop('volume'),
            'publication_date': validated_data.pop('publication_date')
        }
        article = Article.objects.create(**article_data)

        perform_nested_create(article, validated_data)

        return article

class DiversesListSerializer(serializers.ModelSerializer):
    id = HashidSerializerCharField(source_field='zubdarg.Diverse.id', read_only=True)
    sources = SourceSerializer(many=True, read_only=True)
    genres = GenreSerializer(many=True, read_only=True)
    publisher = PublisherSerializer(many=True, read_only=True)
    authors = AuthorSerializer(many=True, read_only=True)

    class Meta:
        model = Diverse
        fields = ('id',) + COMMON_FIELDS


class DiverseSerializer(DiversesListSerializer):
    pages = PageSerializer(many=True, read_only=True)

    class Meta:
        model = Diverse
        fields = ('id',) + COMMON_FIELDS + ('pages',)


class DiverseCreateSerializer(BaseCreateSerializer):
    class Meta:
        model = Diverse
        fields = COMMON_FIELDS + ('pages',)

    def create(self, validated_data):

        title = validated_data.pop('title', None)

        if title is None:
            raise serializers.ValidationError('Title is required')

        diverse_data = {
            'title': title,
            'summary': validated_data.pop('summary'),
            'publication_date': validated_data.pop('publication_date')
        }
        diverse = Diverse.objects.create(**diverse_data)

        perform_nested_create(diverse, validated_data)

        return diverse


