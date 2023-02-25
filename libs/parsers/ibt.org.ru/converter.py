import json

def write_to_json(books, filename):
    with open(f'data/{filename}', 'r+', encoding='utf-8') as f:
        data = {}
        try:
            data = json.load(f)
        except json.decoder.JSONDecodeError:
            json.dump({}, f)

        data.update(books)

        f.seek(0)
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    converted_data = {}
    with open('data/ibt.json', 'r+', encoding='utf-8') as ibt:
        ibt_data = json.load(ibt)
        for index, book in enumerate(ibt_data):
            page = index + 1
            converted_data[page] = ' '.join(book['verses'])
            print(f'Page {page} is done.')

        write_to_json(converted_data, 'upload.json')


