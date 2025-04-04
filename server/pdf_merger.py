# server/pdf_merger.py
import sys
import json
from PyPDF2 import PdfMerger, PdfReader
import os

def merge_pdfs(pdf_files, output_path):
    merger = PdfMerger()
    try:
        for pdf_file in pdf_files:
            print(f"Processing file: {pdf_file}")
            if os.path.exists(pdf_file):
                try:
                    pdf_reader = PdfReader(pdf_file, strict=False) #added strict = false
                    merger.append(pdf_file)
                except Exception as e:
                    print(f"Error appending {pdf_file}: {e}")
            else:
                print(f"File not found: {pdf_file}")
        merger.write(output_path)
        print(f"Merged PDF saved to: {output_path}") # added print statement
        merger.close()
    except Exception as e:
        print(f"Error during merge: {e}")

if __name__ == "__main__":
    # data = json.loads(sys.stdin.read())
    pdf_files = ["ab.pdf","cd.pdf"]
    # pdf_files = data["pdf_files"]
    output_path = "output_path.pdf"
    print(f"PDF files: {pdf_files}")
    print(f"output path: {output_path}")
    merge_pdfs(pdf_files, output_path)