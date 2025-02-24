from flask import Blueprint

from controllers.bookController import (delete_book, edit_book, get_books,
                                        get_books_by_id, register, search_book)

book_bp = Blueprint('book', __name__)

book_bp.route('/register', methods=['POST'])(register)
book_bp.route('')(get_books)
book_bp.route('/<int:id>')(get_books_by_id)
book_bp.route('/<int:id>', methods=['PUT'])(edit_book)
book_bp.route('/<int:id>', methods=['DELETE'])(delete_book)
book_bp.route('/search')(search_book)