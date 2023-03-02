import json
import requests
from bs4 import BeautifulSoup

# This parser parses the ibt.org.ru website
# It parses the following page:
# https://ibt.org.ru/ru/text?m=CHE

def write_to_json(books, filename):
    with open(f'data/{filename}', 'r+', encoding='utf-8') as f:
        data = []
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            json.dump([], f)

        data.extend(books)

        f.seek(0)
        json.dump(data, f, indent=2, ensure_ascii=False)


def get_books():
    soup = BeautifulSoup(
        requests.get('https://ibt.org.ru/ru/text?m=CHE&l=Gen&g=0').content,
        'html.parser'
    )
    # List of all the books
    books = [{
            'title': book.text,
            'tag': book.get('value'),
        } for book in soup.find('select', {"id": "selbook"}).find_all("option")]
    print(books)
    return books

def get_chapters(book_tag):
    soup = BeautifulSoup(
        requests.get(f'https://ibt.org.ru/ru/text?m=CHE&l={book_tag}&g=33f#sv').content,
        'html.parser'
    )
    chapters = [c.text for c in soup.find('select', {"id": "selchap"}).find_all("option")]
    print(chapters)
    return chapters

def clean_verse_text(verse):
    verse = verse.replace('\xa0', ' ').replace('\n', ' ').replace('\r', ' ').strip()
    verse = verse.replace('  ', ' ')
    verse = verse.replace('i', 'ӏ')
    verse = verse.replace('I', 'Ӏ')
    if verse.endswith(' '):
        verse = verse[:-1]
    if verse.startswith(' '):
        verse = verse[1:]

    return verse

def get_verses(book_tag, chapter):
    soup = BeautifulSoup(
        requests.get(f'https://ibt.org.ru/ru/text?m=CHE&l={book_tag}.{chapter}&g=33f#sv').content,
        'html.parser'
    )
    verses = [clean_verse_text(v.text) for v in soup.find('div', {"id": "flowcolumn"}).find("div", {"class": "cs-CHE"}).find_all("span", {"class": "vs"}) if v.text != ' ']

    print(verses)
    return verses


def main():
    books = get_books()
    for book in books:
        book['chapters'] = get_chapters(book['tag'])

    for book in books:
        for chapter in book['chapters']:
            book['verses'] = get_verses(book['tag'], chapter)

    write_to_json(books, 'ibt.json')

if __name__ == '__main__':
    main()