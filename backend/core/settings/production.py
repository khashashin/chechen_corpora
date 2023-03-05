from .base import *
import os

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration

sentry_sdk.init(
    dsn="https://7c5c5f7561194ce38306545c51058455@sentry.khas.dev/8",
    integrations=[DjangoIntegration()],
    auto_session_tracking=False,
    traces_sample_rate=0.01,
    release="1.0.0",
    environment="production",
)

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')
HASHID_FIELD_SALT = os.environ.get('HASHID_FIELD_SALT')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
print('Debugging status is: ', DEBUG)

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost').split(',')

CORS_ALLOWED_ORIGINS = os.environ.get('CORS_ALLOWED_ORIGINS', '').split(',')

CORS_ALLOW_HEADERS = os.environ.get('CORS_ALLOW_HEADERS', '').split(',')

APPWRITE = {
    'PROJECT_ENDPOINT': os.environ.get('APPWRITE_PROJECT_ENDPOINT', ''),
    'PROJECT_ID': os.environ.get('APPWRITE_PROJECT_ID', ''),
    'PROJECT_API_KEY': os.environ.get('APPWRITE_PROJECT_API_KEY', ''),
}

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

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

DB_SSL_MODE = os.environ.get('DB_SSL_MODE', 'True') == 'True'
if DB_SSL_MODE:
    DATABASES['default']['OPTIONS']['sslmode'] = 'prefer'
