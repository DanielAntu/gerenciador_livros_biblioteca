from functools import wraps

from flask import jsonify, request

from validators.cpf_validator import validator_cpf


def register_validator(f):
    @wraps(f)
    def decorated_functions(*args, **kwargs):
        data: dict = request.get_json()

        if not data.get('firstName'):
            return jsonify(msg='O nome é obrigatório.'), 400

        if not data.get('lastName'):
            return jsonify(msg='O sobrenome é obrigatório.'), 400

        if not data.get('email'):
            return jsonify(msg='O email é obrigatório.'), 400

        if not data.get('cpf'):
            return jsonify(msg='O CPF é obrigatório.'), 400

        if not data.get('type'):
            return jsonify(msg='Sua ocupação é obrigatória.'), 400

        if not data.get('type') == 'teacher' and not data.get('type') == 'student':
            return jsonify(msg='Só é permitido professor ou aluno.'), 400

        if data.get('cpf'):
            if not validator_cpf(data.get('cpf')):
                return jsonify(msg='O CPF não é válido.'), 400

        return f(*args, **kwargs)
    
    return decorated_functions

def profile_validator(f):
    @wraps(f)
    def decorated_functions(*args, **kwargs):
        data: dict = request.get_json()

        if not data.get('firstName'):
            return jsonify(msg='O nome é obrigatório.'), 400

        if not data.get('lastName'):
            return jsonify(msg='O sobrenome é obrigatório.'), 400

        if not data.get('email'):
            return jsonify(msg='O email é obrigatório.'), 400

        if not data.get('cpf'):
            return jsonify(msg='O CPF é obrigatório.'), 400

        if not data.get('type'):
            return jsonify(msg='Sua ocupação é obrigatória.'), 400

        if not data.get('type') == 'teacher' and not data.get('type') == 'student':
            return jsonify(msg='Só é permitido professor ou aluno.'), 400

        if data.get('cpf'):
            if not validator_cpf(data.get('cpf')):
                return jsonify(msg='O CPF não é válido.'), 400

        return f(*args, **kwargs)
    
    return decorated_functions