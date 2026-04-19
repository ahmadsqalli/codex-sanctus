from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import json

def sql_dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: value for key, value in zip(fields, row)}

app = FastAPI()
conn = sqlite3.connect('codex_sanctus.db', check_same_thread=False)
conn.row_factory = sql_dict_factory

origins = [
    "http://localhost:3000", # React development server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Allows specified origins
    allow_credentials=True,         # Allows cookies/auth headers to be included in requests
    allow_methods=["*"],            # Allows all standard methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],            # Allows all headers to be sent in the request
)

def return_formated_response(return_from: str, error: bool, data):
    return {"return_from": return_from, "error": error, "data": data}

def validate_read_param(read_param):
    if read_param == "full":
        return "full"
    
    if read_param.isdigit():
        return int(read_param)
    
    if ":" in read_param:
        read_param_parts = read_param.split(":")
        if len(read_param_parts) == 2 and all(part.isdigit() for part in read_param_parts) and int(read_param_parts[0]) < int(read_param_parts[1]):
            return tuple(map(int, read_param_parts))
    
    return None


# Codex Sanctus Home Page
@app.get("/")
def home():
    return return_formated_response("home", False, "Welcome to Codex Sanctus, A Faithfull's Library")

# List all books in the library
@app.get("/library")
def library():
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM book_editions")
    books = cursor.fetchall()
    for book in books:
        metadata_dict = json.loads(book["edition_metadata"])
        book["edition_metadata"] = metadata_dict
    
    if not books:
        return return_formated_response("library", True, "No books found in the library")
    else:
        return return_formated_response("library", False, books)

# Structural nodes of the book
@app.get("/book/{book_id}")
def node_content(book_id: int):
    book_cursor = conn.cursor()
    book_cursor.execute("SELECT * FROM book_editions WHERE id = ?", (book_id,))
    book = book_cursor.fetchone()

    if not book:
        return return_formated_response("book_nodes", True, "No book found for the given book_id")
    
    metadata_dict = json.loads(book["edition_metadata"])
    book["edition_metadata"] = metadata_dict

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM book_structure WHERE book_id = ? ORDER BY id", (book_id,))
    result = cursor.fetchall()

    if not result:
        return return_formated_response("book_nodes", True, "No nodes found for the given book_id")
    
    else:
        return return_formated_response("book_nodes", False, {
    "book_edition": book,
    "structure": result  # Send pre‑structured tree
    })

# Navigate by path
@app.get("/book/{book_id}/path/{path}")
def node_content(book_id: int, path: str):
    # Fetch structure by path
    return return_formated_response("node_content", False, 'inactive endpoint for now')

@app.get("/read/{book_id}/node/{structure_id}/{read_param}")
def read(book_id: int, structure_id: int, read_param: str):
    book_cursor = conn.cursor()
    book_cursor.execute("SELECT * FROM book_editions WHERE id = ?", (book_id,))
    book = book_cursor.fetchone()
    metadata_dict = json.loads(book["edition_metadata"])
    book["edition_metadata"] = metadata_dict
    
    if not book:
        return return_formated_response("read", True, "No book found for the given book_id")
    
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM book_structure WHERE book_id = ? AND id = ?", (book_id, structure_id))
    structure = cursor.fetchone()

    if not structure:
        return return_formated_response("book_nodes", True, "No nodes found for the given book_id and structure_id")
    
    if read_param == "full":
        # Fetch all verses for the node
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM verses WHERE book_id = ? AND structure_id = ? ORDER BY verse_num, verse_suffix", (book_id, structure_id))
        content = cursor.fetchall()
        if not content:
            return return_formated_response("read_full", True, "No verses found for the given structure_id")
        else:
            return return_formated_response("read_full", False, {
                "book_edition": book,
                "structure": structure,
                "content": content
            })
    
    if read_param.isdigit():
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM verses WHERE book_id = ? AND structure_id = ? AND verse_num = ? ORDER BY verse_suffix", (book_id, structure_id, read_param))
        content = cursor.fetchall()
        if not content:
            return return_formated_response("read_verse", True, "No verse found for the given structure_id and verse_num")
        else:
            return return_formated_response("read_verse", False, {
                "book_edition": book,
                "structure": structure,
                "content": content
            })
    
    if ":" in read_param:
        print('error occuring here')
        read_param_parts = read_param.split(":")
        if len(read_param_parts) == 2 and all(part.isdigit() for part in read_param_parts) and int(read_param_parts[0]) < int(read_param_parts[1]):
            start_verse, end_verse = map(int, read_param_parts)
            # Fetch verse range
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM verses WHERE book_id = ? AND structure_id = ? AND verse_num BETWEEN ? AND ? ORDER BY verse_num, verse_suffix", (book_id, structure_id, start_verse, end_verse))
            content = cursor.fetchall()
            if not content:
                return return_formated_response("read_verses_range", True, "No verses found for the given structure_id and verse range")
            else:
                return return_formated_response("read_verses_range", False, {
                    "book_edition": book,
                    "structure": structure,
                    "content": content
                })
        else:
            return return_formated_response("read", True, "Invalid read_param format. Use 'full', a verse number, or a verse range (e.g., '1:5').")
    else:
        return return_formated_response("read", True, "Invalid read_param format. Use 'full', a verse number, or a verse range (e.g., '1:5').")
