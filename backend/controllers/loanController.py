from flask import jsonify, request, send_file
from flask_jwt_extended import get_jwt_identity, jwt_required

from services import LoanService, bookService, clientService
from services.service_token import find_user_by_token
from utils.generate_pdf import generate_pdf
from utils.get_date import get_date


@jwt_required()
def register(id):
    data: dict = request.get_json()
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404

    if not data.get('cpf'):
        return jsonify(msg='O CPF é obrigatório.'), 400
    
    book = bookService.get_book_by_id(id)

    if not book:
        return jsonify(msg='livro não encontrado.'), 404
    
    if book.quant == 0:
        return jsonify(msg='Livro esgotado.'), 400
    
    book.quant = int(book.quant) - 1
    bookService.session.commit()
    
    client = clientService.find_client_by_cpf(data)

    if not client:
        return jsonify(msg='Cliente não encontrado'), 404

    if client.type == 'student':
        date_loan, date_return = get_date(3)
    else:
        date_loan, date_return = get_date(10)
    
    loan = {
        'clientId': client.id,
        'bookId': book.id,
        'dateLoan': date_loan,
        'dateReturn': date_return,
        'isReturn': False
    }

    new_loan = LoanService.register(loan)
    
    return jsonify(msg='O empréstimo do livro foi feito com sucesso.', loan=new_loan.to_dict_details()), 201

@jwt_required()
def get_loans():
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    loans = LoanService.get_loans()
    loans_list = []

    if loans:
        for loan in loans:
            loans_list.append(loan.to_dict())
    
    return jsonify(loans_list)

@jwt_required()
def get_loan_by_id(id):
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404

    loan = LoanService.get_loan_by_id(id)

    if not loan:
        return jsonify(msg='Empréstimo não encontrado.'), 404
    
    
    return jsonify(loan.to_dict_details())

@jwt_required()
def loan_return(id):
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404

    loan = LoanService.get_loan_by_id(id)

    if not loan:
        return jsonify(msg='Empréstimo não encontrado.'), 404
    
    if loan.isReturn:
        return jsonify(msg='O livro já retornou'), 400
    
    book = bookService.get_book_by_id(loan.bookId)

    if not book:
        return jsonify(msg='Livro não encontrado.'), 404
    
    book.quant = int(book.quant) + 1
    bookService.session.commit()

    loan.isReturn = True
    LoanService.session.commit()
    
    return jsonify(msg='Livro retornado com sucesso.', loan=loan.to_dict_details())

@ jwt_required()
def delete_loan(id):
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404

    loan = LoanService.get_loan_by_id(id)

    if not loan:
        return jsonify(msg='Empréstimo não encontrado.'), 404
    
    if not loan.isReturn:
        return jsonify(msg='Não pode apagar o empréstimo enquanto não for devolvido o livro.'), 400
    
    LoanService.delete_loan(loan)
    
    return jsonify(msg='arquivo deletado com sucesso.')

@jwt_required()
def search_loan():
    search = request.args.get('key')

    if not search:
        return jsonify(msg='O termo é obrigatório.'), 400
    
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    loans = LoanService.search_loan(search)

    loan_list = []

    if loans:
        for loan in loans:
            loan_list.append(loan.to_dict())

    return jsonify(loan_list)

@jwt_required()
def filter_is_return():
    search = request.args.get('key')
    is_return = request.args.get('isreturn')

    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404

    if not is_return:
        loans = LoanService.get_loans()
        loan_list = []

        if loans:
            for loan in loans:
                loan_list.append(loan.to_dict())
            
        return jsonify(loan_list)
    
    loans = LoanService.filter_is_return(search, is_return)

    loan_list = []

    if loans:
        for loan in loans:
            loan_list.append(loan.to_dict())
        
    return jsonify(loan_list)

@jwt_required()
def generate_receipt(id):
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    loan = LoanService.get_loan_by_id(id)

    if not loan:
        return jsonify(msg='Empréstimo não encontrado.'), 404
    
    buffer = generate_pdf(loan.to_dict_details())
    
    return send_file(buffer, as_attachment=True, download_name=f'recibo_{loan.clientId}.pdf', mimetype='application/pdf')