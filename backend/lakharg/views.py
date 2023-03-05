import nltk
from uuid import uuid4
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from lakharg.models import Words
from zubdarg.models import Page, Book

nltk.download('punkt')


def remove_non_alphabetic_characters(sentence):
    """
    This function is used to remove all the non-alphabetic characters
    from the sentence
    """
    return ''.join([char for char in sentence if char.isalpha() or char == ' '])


def append_dots(sentence, query):
    """
    This function is used to append dots to the end of the query
    if the next after the query is not one of the following:
    """
    next_char = sentence[sentence.index(query) + len(query)]
    query_word = query if \
        next_char == ' ' or \
        next_char == '.' or \
        next_char == ',' or \
        next_char == '?' or \
        next_char == '!' or \
        next_char == ':' or \
        next_char == ';' or \
        next_char == '"' or \
        next_char == "'" or \
        next_char == '(' or \
        next_char == ')' or \
        next_char == '[' or \
        next_char == ']' else query + '...'

    return query_word


class SearchView(APIView):
    # Read only permission
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        query = request.GET.get('q')
        query = query.replace('1', 'Ӏ')
        query = query.lower()
        if not query:
            return Response({"error": "No query provided"}, status=400)

        if len(query) < 2:
            return Response({"error": "Query must be at least 2 characters long"}, status=400)

        pages = Page.objects.filter(text__icontains=query)

        similar_words = Words.objects.annotate(similarity=TrigramSimilarity('word', query)).filter(similarity__gt=0.3).order_by('-similarity')
        similar_words = [word.word for word in similar_words]

        # cut out the sentences that match the query
        response = {
            'query': query,
            'results': [],
            'unique_words': [],
            'in_pair_before': [],
            'in_pair_after': [],
            'similar_words': similar_words,
        }
        for page in pages:
            sentences = nltk.tokenize.sent_tokenize(page.text)
            for sentence in sentences:
                if query in sentence:
                    # this is crazy, but all what it does is to get all the words that match the query
                    # and remove all the non-alphabetic characters
                    for q in query.split(' '):
                        words = [''.join([char for char in word if char.isalpha() or char == '-']) for word in sentence.split(' ') if q in word.lower()]
                        # unique words
                        for word in words:
                            if word not in response['unique_words']:
                                response['unique_words'].append(word)
                    # try to get the previous and next sentence of matchin sentence
                    try:
                        previous_sentence = sentences[sentences.index(sentence) - 1]
                    except IndexError:
                        previous_sentence = None
                    try:
                        next_sentence = sentences[sentences.index(sentence) + 1]
                    except IndexError:
                        next_sentence = None

                    try:
                        if sentence[sentence.index(query) - 1] == ' ':
                            previous_word = sentence[:sentence.index(query) - 1].split(' ')[-1]
                        else:
                            previous_word = sentence[:sentence.index(query) - 1].split(' ')[-2]
                    except IndexError:
                        previous_word = None

                    if previous_word and len(previous_word) > 1:
                        response['in_pair_before'].append(
                            remove_non_alphabetic_characters(f'{previous_word} {append_dots(sentence, query)}')
                        )

                    try:
                        if sentence[sentence.index(query) + len(query)] == ' ':
                            next_word = sentence[sentence.index(query) + len(query) + 1:].split(' ')[0]
                        else:
                            next_word = sentence[sentence.index(query) + len(query) + 1:].split(' ')[1]
                    except IndexError:
                        next_word = None

                    if next_word and len(next_word) > 1:
                        response['in_pair_after'].append(
                            remove_non_alphabetic_characters(f'{append_dots(sentence, query)} {next_word}')
                        )


                    response['results'].append({
                        'uuid': f'{uuid4()}',
                        'id': f'{page.id.hashid}',
                        'previous_sentence': previous_sentence,
                        'sentence': sentence,
                        'next_sentence': next_sentence,
                        'query': query,
                        'matching_words': words,
                        'book': {
                            'title': page.book.title,
                            'id': f'{page.book.id.hashid}',
                            'year': page.book.publication_date.year,
                            'page': page.number,
                            'sources': [source.name for source in page.book.sources.all()],
                        }
                    })

        return Response(response, status=200)


class WordsView(APIView):
    # Read only permission
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        query = request.GET.get('q')
        if not query:
            words = Words.objects.order_by('word')
        else:
            # get all words that start with query
            words = Words.objects.filter(word__istartswith=query).order_by('word')

        # dictionary of words where key is the first letter of the word
        response = {}
        for word in words:
            if not len(word.word) or word.word[0] == 'ъ' or word.word[0] == 'ь':
                continue

            if word.word[0] not in response:
                response[word.word[0]] = []

            response[word.word[0]].append(word.word)

        return Response(response, status=200)


class StatsView(APIView):
    # Read only permission
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        stats = {
            'unique_words': Words.objects.count(),
            'books': Book.objects.count(),
        }

        return Response(stats, status=200)