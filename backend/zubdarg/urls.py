from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'books', views.BookViewSet)
router.register(r'articles', views.ArticleViewSet)
router.register(r'diverses', views.DiverseViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('upload/pdf/', views.PDFParserView.as_view()),
    path('upload/json/', views.UploadJSONView.as_view()),
    path('upload/csv/', views.UploadCSVView.as_view()),
    path('upload/txt/', views.UploadTXTView.as_view()),
]