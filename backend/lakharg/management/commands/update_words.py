from django.core.management import BaseCommand

from lakharg.models import Words, Version
from zubdarg.models import Page


class Command(BaseCommand):
    help = 'Update words'

    def handle(self, *args, **options):
        versions = Version.objects.all()
        # get all pages which ids are not in versions
        pages = Page.objects.exclude(id__in=versions.values_list('reference_id', flat=True))

        page_words = set()
        for page in pages:
            words = page.text.split(' ')
            self.stdout.write(self.style.SUCCESS(f'[INFO] Processing page {page.id}'))
            self.stdout.write(self.style.SUCCESS(f'[INFO] Found {len(words)} words'))
            for word in words:
                word = word.lower()
                word = ''.join([char for char in word if char.isalpha() or char == '-'])
                if word not in page_words:
                    page_words.add(word)
                else:
                    self.stdout.write(self.style.SUCCESS(f'[WARNING] Word {word} already exists'))

            Version.objects.create(reference_id=page, version='1.0.0')

        for word in page_words:
            _, created = Words.objects.get_or_create(word=word)
            if created:
                self.stdout.write(self.style.SUCCESS(f'[SUCCESS] Created word {word}'))