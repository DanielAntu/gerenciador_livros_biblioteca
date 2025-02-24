from functools import wraps

from flask import jsonify, request

from validators.cpf_validator import validator_cpf
from validators.validate_password import validate_password


def validate_register(f):
    @wraps(f)
    def decorated_functions(*args, **kwargs):
        data: dict = request.get_json()
        
        if not data.get('firstName'):
            return jsonify(msg='O primeiro nome é obrigatório.'), 400

        if not data.get('lastName'):
            return jsonify(msg='O sobrenome é obrigatório.'), 400
        
        if not data.get('cpf'):
            return jsonify(msg='O CPF é obrigatório.'), 400

        if not data.get('email'):
            return jsonify(msg='O E-mail é obrigatório.'), 400
        
        if not data.get('password1'):
            return jsonify(msg='A senha é obrigatória.'), 400

        if not data.get('password2'):
            return jsonify(msg='A confirmação de senha é obrigatória.'), 400

        if not len(data['cpf']) == 11:
            return jsonify(msg='O CPF precisa ter 11 dígitos.'), 400

        if data.get('cpf'):
            if not validator_cpf(data['cpf']):
                return jsonify(msg='Seu CPF é invalido verifique se há algum erro.'), 400

        if data['password1'] != data['password2']:
            return jsonify(msg='As senhas precisam ser iguais.'), 400

        is_password, msg = validate_password(data['password1'])
        
        if not is_password:
            return jsonify(msg=msg), 400

        
        return f(*args, **kwargs)
    return decorated_functions

def validate_login(f):
    @wraps(f)
    def decorated_functions(*args, **kwargs):
        data: dict = request.get_json()

        if not data.get('identity'):
            return jsonify(msg='O CPF ou E-mail é obrigatório.'), 400
        
        if not data.get('password'):
            return jsonify(msg='A senha é obrigatória.'), 400

        return f(*args, **kwargs)
    return decorated_functions

def validate_profile(f):
    @wraps(f)
    def decorated_functions(*args, **kwargs):
        data: dict = request.get_json()

        if not data.get('firstName'):
            return jsonify(msg='O primeiro nome é obrigatório.'), 400

        if not data.get('lastName'):
            return jsonify(msg='O sobrenome é obrigatório.'), 400
        
        if not data.get('cpf'):
            return jsonify(msg='O CPF é obrigatório.'), 400

        if not data.get('email'):
            return jsonify(msg='O E-mail é obrigatório.'), 400

        if data.get('password1'):
            if not data.get('password2'):
                return jsonify(msg='A confirmação de senha é obrigatória.'), 400

            if data['password1'] != data.get('password2'):
                return jsonify(msg='As senhas precisam ser iguais.'), 400

            is_password, msg = validate_password(data['password1'])
        
            if not is_password:
                return jsonify(msg=msg), 400

        return f(*args, **kwargs)
    return decorated_functions