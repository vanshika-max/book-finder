from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Load the Excel sheet containing book data
try:
    book_data = pd.read_excel('library_books.xlsx')
except Exception as e:
    print(f"Error loading Excel file: {e}")

@app.route('/get-location', methods=['POST'])
def get_location():
    try:
        data = request.json
        print(f"Request data: {data}")

        book_name = data.get('bookName', '').lower()
        author_name = data.get('authorName', '').lower()
        print(f"Book Name: {book_name}, Author Name: {author_name}")

        if not book_name or not author_name:
            return jsonify({'error': 'Missing bookName or authorName'}), 400

        print("Searching in Excel file...")
        book_info = book_data[(book_data['Book Name'].str.lower() == book_name) & 
                              (book_data['Author Name'].str.lower() == author_name)]
        print(f"Book Info: {book_info}")

        if not book_info.empty:
            # Convert to Python native types
            row = int(book_info.iloc[0]['Row Number'])
            rack = int(book_info.iloc[0]['Rack Number'])
            floor = int(book_info.iloc[0]['Floor'])
            return jsonify({'row': row, 'rack': rack, 'floor': floor})
        else:
            return jsonify({'error': 'Book not found'}), 404
    except Exception as e:
        print(f"Error in /get-location endpoint: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
