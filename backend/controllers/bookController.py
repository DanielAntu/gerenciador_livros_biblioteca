from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from services import bookService
from services.service_token import find_user_by_token
from validators.book_validators import validate


@jwt_required()
@validate
def register():
    data = request.get_json()
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    try:
        data['quant'] = int(data['quant'])
    except ValueError:
        return jsonify(msg='Digite apenas números'), 400
    
    bookService.register(data)
    return jsonify(msg='Livro cadastrado com sucesso.'), 201

@jwt_required()
def get_books():
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    books = bookService.get_books()
    list_books = []
    for book in books:
        list_books.append(book.to_dict())
    
    return jsonify(list_books)

@jwt_required()
def get_books_by_id(id):
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    book = bookService.get_book_by_id(id)

    if not book:
        return jsonify(msg='Livro não encontrado.'), 404
    
    return jsonify(book.to_dict())

@jwt_required()
@validate
def edit_book(id):
    data = request.get_json()
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    book = bookService.get_book_by_id(id)

    if not book:
        return jsonify(msg='Livro não encontrado.'), 404
    
    book.title = data['title']
    book.quant = data['quant']

    bookService.session.commit()

    return jsonify(msg='Livro atualizado com sucesso.', book=book.to_dict())

@jwt_required()
def delete_book(id):
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    book = bookService.get_book_by_id(id)

    if not book:
        return jsonify(msg='Livro não encontrado.'), 404
    
    bookService.delete_book(book)
    
    return jsonify(msg='Livro deletado com sucesso.')

@jwt_required()
def search_book():
    search = request.args.get('title')

    if not search:
        return jsonify(msg='Informe sua pesquisa'), 400
    
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    books = bookService.search_book(search)
    
    return jsonify(books)