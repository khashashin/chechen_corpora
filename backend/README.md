# Backend set up

## Prerequisites
Make shure you have installed the following:

- [Python 3.10](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)

You need the PostgreSQL setup to be able to run migrations since this project uses PostgreSQL trigram extension.

## Installation
Clone the repository and install the requirements.

```bash
git clone https://github.com/khashashin/chechen_corpora.git
cd backend
```
Create a virtual environment and activate it.
```bash
python -m venv .venv
source .venv/bin/activate
```
If you are using Windows, use the following command instead.
```bash
python -m venv .venv
.venv\Scripts\activate
```
Install the requirements.
```bash
pip install -r requirements.txt
```
Create a `local.py` file in the `backend/settings/local.py` and add the following lines.
```python
from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')
HASHID_FIELD_SALT = os.environ.get('HASHID_FIELD_SALT')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'True') == 'True'

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_HEADERS = os.environ.get('CORS_ALLOW_HEADERS', '').split(',')

DATABASES = {
    'default': {
        'ENGINE': os.environ.get('DB_ENGINE'),
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': os.environ.get('DB_PORT'),
        'OPTIONS': {}
    }
}

APPWRITE = {
    'PROJECT_ENDPOINT': os.environ.get('APPWRITE_PROJECT_ENDPOINT', ''),
    'PROJECT_ID': os.environ.get('APPWRITE_PROJECT_ID', ''),
    'PROJECT_API_KEY': os.environ.get('APPWRITE_PROJECT_API_KEY', ''),
}
```
Create a `.env` file in the `backend` directory and add the following lines.
```bash
SECRET_KEY=your_secret_key
HASHID_FIELD_SALT=your_hashid_field_salt
DEBUG=True
ALLOWED_HOSTS=localhost
CORS_ALLOW_HEADERS=USER_ID,User-ID,Authorization,Content-Type

DB_ENGINE=django.db.backends.postgresql
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
```
You also need to set up environment variables for the Appwrite API.
```bash
APPWRITE_PROJECT_ENDPOINT=https://fb.gibbit.ch/v1
APPWRITE_PROJECT_ID=ce-lang-comm-corpora
APPWRITE_PROJECT_API_KEY=your_appwrite_api_key
```
Run the migrations.
```bash
python manage.py migrate
```

## Uploading prepared data
In order to upload the prepared book which can be found under `../libs/parsers/ibt.org.ru/data/upload.json`, you need to run the following command.
```bash
python manage.py upload_book
```

## Initialize unique words
In order to initialize the unique words, you need to run the following command.
```bash
python manage.py update_words
```
Now you can start the server and use the API.

## Running the server
```bash
python manage.py runserver
```
