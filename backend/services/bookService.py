from conection import session
from models.Book import Book


def register(data):
    book = Book(**data)
    session.add(book)
    session.commit()

def get_books():
    books = session.query(Book).all()

    return books

def get_book_by_id(id):
    book = session.query(Book).filter_by(id=id).first()

    if not book:
        return
    
    return book

def delete_book(book):
    session.delete(book)
    session.commit()

def search_book(term):
    books = session.query(Book).filter(
        Book.title.ilike(f'%{term}%')
    ).all()

    if not books:
        return []

    return [book.to_dict() for book in books]