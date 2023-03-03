from uuid import uuid4
from nltk import tokenize
from django.contrib.postgres.search import TrigramSimilarity
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from lakharg.models import Words
from zubdarg.models import Page, Book


class SearchView(APIView):
    # Read only permission
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get(self, request, format=None):
        query = request.GET.get('q')
        query = query.replace('1', 'Ӏ')
        query = query.lower()
        if not query:
            return Response({"error": "No query provided"}, status=400)

        if len(query) < 3:
            return Response({"error": "Query must be at least 3 characters long"}, status=400)

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
            sentences = tokenize.sent_tokenize(page.text)
            for sentence in sentences:
                if query in sentence:
                    # this is crazy, but all what it does is to get all the words that match the query
                    # and remove all the non-alphabetic characters
                    words = [''.join([char for char in word if char.isalpha() or char == '-']) for word in sentence.split(' ') if query in word.lower()]
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

                    # get each previous word that stays with each querymatched word
                    clean_sentence_words = [''.join([char for char in word if char.isalpha()]) for word in sentence.split(' ')]
                    for index, word in enumerate(clean_sentence_words):
                        if word == query:
                            try:
                                combined_word = f'{clean_sentence_words[index - 1]} {word}' if len(clean_sentence_words[index - 1]) > 1 else None
                            except IndexError:
                                combined_word = None

                            if combined_word:
                                response['in_pair_before'].append(combined_word)

                    for index, word in enumerate(clean_sentence_words):
                        if word == query:
                            try:
                                combined_word = f'{word} {clean_sentence_words[index + 1]}' if len(clean_sentence_words[index + 1]) > 1 else None
                            except IndexError:
                                combined_word = None

                            if combined_word:
                                response['in_pair_after'].append(combined_word)

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