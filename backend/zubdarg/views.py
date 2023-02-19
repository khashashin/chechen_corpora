from rest_framework import viewsets
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework.response import Response

from .helpers import extract_text_from_pdf
from .serializers import *
from .models import *


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookPageSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return BookSerializer
        return BookPageSerializer


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer


class PDFParserView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        pdf_file = request.data['file']
        pdf_text = extract_text_from_pdf(pdf_file)
        if not pdf_text:
            return Response({"error": "Could not parse the file"}, status=400)

        return Response(pdf_text, status=200)


class UploadJSONView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        json_file = request.data['file']
        if not json_file:
            return Response({"error": "Could not parse the file"}, status=400)

        return Response(json_file, status=200)


class UploadCSVView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        csv_file = request.data['file']
        csv_text = csv_file.read()
        if not csv_text:
            return Response({"error": "Could not parse the file"}, status=400)

        return Response(csv_text, status=200)


class UploadTXTView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        txt_file = request.data['file']
        txt_text = txt_file.read()
        if not txt_text:
            return Response({"error": "Could not parse the file"}, status=400)

        return Response(txt_text, status=200)
