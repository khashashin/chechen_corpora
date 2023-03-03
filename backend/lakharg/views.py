from uuid import uuid4
from nltk import tokenize
from rest_framework.views import APIView
from rest_framework.response import Response

from lakharg.models import Words
from zubdarg.models import Page, Book


class SearchView(APIView):

    def get(self, request, format=None):
        query = request.GET.get('q')
        query = query.replace('1', 'Ӏ')
        query = query.lower()
        if not query:
            return Response({"error": "No query provided"}, status=400)

        if len(query) < 3:
            return Response({"error": "Query must be at least 3 characters long"}, status=400)

        pages = Page.objects.filter(text__icontains=query)

        # cut out the sentences that match the query
        response = {
            'query': query,
            'results': [],
            'unique_words': []
        }
        for page in pages:
            sentences = tokenize.sent_tokenize(page.text)
            for sentence in sentences:
                if query in sentence:
                    # matching words
                    words = [word for word in sentence.split(' ') if query in word]
                    # unique words
                    for word in words:
                        word = word.lower()
                        word = ''.join([char for char in word if char.isalpha() or char == '-'])
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
                    response['results'].append({
                        'uuid': f'{uuid4()}',
                        'id': f'{page.id.hashid}',
                        'previous_sentence': previous_sentence,
                        'sentence': sentence,
                        'next_sentence': next_sentence,
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

    def get(self, request, format=None):
        stats = {
            'unique_words': Words.objects.count(),
            'books': Book.objects.count(),
        }

        return Response(stats, status=200)