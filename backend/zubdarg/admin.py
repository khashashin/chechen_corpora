from django.contrib import admin
from .models import Author, Book, Genre, Page, Publisher


class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "publication_date")
    list_filter = ("authors", "publication_date")
    search_fields = ("title", "authors")


class PageAdmin(admin.ModelAdmin):
    list_display = ("number", "document")
    search_fields = ("document__title",)


class AuthorAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


class PublisherAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


class GenreAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


admin.site.register(Author, AuthorAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Page, PageAdmin)
admin.site.register(Publisher, PublisherAdmin)
