from django.urls import path

from . import views

urlpatterns = [
    path('search/', views.SearchView.as_view(), name='search'),
    path('unique-words/', views.WordsView.as_view(), name='words'),
    path('stats/', views.StatsView.as_view(), name='stats'),
]