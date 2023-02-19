import io
import PyPDF2
import pytesseract
from pdf2image import convert_from_bytes
import cv2
from PIL import Image


def is_pdf_valid(pdf_file):
    try:  # Try to open the PDF file
        PyPDF2.PdfReader(pdf_file)
    except PyPDF2.utils.PdfReadError:
        # Return False if the PDF file is corrupted
        return False
    # Return True if the PDF file is valid
    return True


def is_pdf_readable(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    if len(pdf_reader.pages) == 0:
        # Return False if the PDF file is not readable
        return False
    if len(pdf_reader.pages) == 1:
        page = pdf_reader.pages[0]
        if page.extract_text() is None or page.extract_text() == '':
            # Return False if the PDF file is not readable
            return False
    # Return True if the PDF file is readable
    return True


def extract_data_from_pdf(pdf):
    data = {}

    # Iterate over each page of the PDF
    for page in range(len(pdf.pages)):
        data[page] = {}
        data[page]['lines'] = []
        lines = pdf.pages[page].extract_text().split('\n')
        for i, line in enumerate(lines):
            data[page]['lines'].append({
                'line': i,
                'text': line,
            })

    return data


def mark_text_region(image):
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Blur the image to reduce noise
    blur = cv2.medianBlur(gray, 3)
    # Apply adaptive thresholding
    thresh = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 15, 40)
    # Dilate the image to increase the size of the text
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (9, 9))
    dilate = cv2.dilate(thresh, kernel, iterations=4)
    # Find contours in the image
    contours, hierarchy = cv2.findContours(dilate, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    # Sort the contours based on their area
    contours = sorted(contours, key=cv2.contourArea, reverse=True)
    line_items_coordinates = []
    # Iterate over the contours
    for cnt in contours:
        # Calculate the bounding rectangle of the contour
        x, y, w, h = cv2.boundingRect(cnt)
        # Check if the contour is a line item
        if h < 20:
            continue
        # Add the bounding rectangle to the list
        line_items_coordinates.append([x, y, w, h])

    return line_items_coordinates


def get_pages_from_image_pdf(pdf_file):
    value = pdf_file.file.getvalue()
    return convert_from_bytes(value, 350, poppler_path='C:\\poppler\\bin')


def extract_data_from_pdf_image(pdf_file):
    data = {}
    pdf_text = extract_text_from_image(pdf_file)
    data['pages'] = len(pdf_text)
    data['title'] = pdf_text[0]['lines'][0]['text']
    data['author'] = pdf_text[0]['lines'][1]['text']
    data['creator'] = pdf_text[0]['lines'][2]['text']
    data['producer'] = pdf_text[0]['lines'][3]['text']
    data['subject'] = pdf_text[0]['lines'][4]['text']

    return data


def extract_text_from_pdf(pdf_file):
    pdf_bytes = io.BytesIO(pdf_file.read())
    if not is_pdf_valid(pdf_bytes):
        return None

    if not is_pdf_readable(pdf_bytes):
        data = extract_data_from_pdf_image(pdf_file)
    else:
        data = extract_data_from_pdf(PyPDF2.PdfReader(pdf_bytes))

    pdf_file.close()
    return data


def extract_text_from_image(pdf_file):
    pytesseract.pytesseract.tesseract_cmd = 'C:\\Users\\khash\\AppData\\Local\\Programs\\Tesseract-OCR\\tesseract.exe'
    pages = get_pages_from_image_pdf(pdf_file)

    pdf_text = []
    for page in pages:
        pdf_text.append(
            pytesseract.image_to_string(page, lang='rus', config='--psm 11')
        )

    return pdf_text
