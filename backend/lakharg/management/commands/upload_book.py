import json
import os

from django.core.management import BaseCommand

from core.settings import BASE_DIR

from zubdarg.models import Book, Page, Source


class Command(BaseCommand):
    help = 'Upload book'

    def handle(self, *args, **options):
        data_path = os.path.join(BASE_DIR, '../libs/parsers/ibt.org.ru/data')

        book_title = 'Делан йозанаш'
        book_summary = 'Товратах а, Инжилах а лаьтташ долу Делан Йозанаш'
        isbn = '978-5-93943-184-2'
        book_year = '2012-01-01'
        sources = ['https://ibt.org.ru/ru/text?m=CHE&l=Gen.1&g=33f']

        with open(os.path.join(data_path, 'upload.json'), 'r', encoding='utf-8') as book:
            book_data = json.load(book)

            s = [Source.objects.create(name=source) for source in sources]

            book = Book.objects.create(
                title=book_title,
                summary=book_summary,
                isbn=isbn,
                publication_date=book_year
            )
            book.sources.set(s)

            for page, text in book_data.items():
                Page.objects.create(
                    book=book,
                    number=page,
                    text=text
                )

                self.stdout.write(self.style.SUCCESS(f'Successfully created page {page}'))

        self.stdout.write(self.style.SUCCESS('Successfully uploaded book'))