from datetime import timedelta

from flask import jsonify, request
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                jwt_required)

from services import service_token, userService
from validators.user_validators import (validate_login, validate_profile,
                                        validate_register)
from validators.validate_password import check_password, hash_password


@jwt_required()
@validate_register
def register():
    data: dict = request.get_json()

    user_id = get_jwt_identity()

    user_admin = service_token.find_user_by_token(user_id)

    if not user_admin:
        return jsonify(msg='Usuário não encontrado.'), 404

    password = hash_password(data['password1'])
    date_validated = data.copy()
    date_validated.pop('password2')
    date_validated.pop('password1')
    date_validated['password'] = password

    user = userService.find_user(date_validated)

    if user:
        return jsonify(msg='Usuário já existente.'), 400
    
    userService.register(date_validated)
    return jsonify(msg='Conta admin criada com sucesso.'), 201

@validate_login
def login():
    data: dict = request.get_json()

    user = userService.find_user_login(data)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    password_check = check_password(data['password'], user.password)

    if not password_check:
        return jsonify(msg='A senha está incorreta.'), 400
    
    token = create_access_token(str(user.id), expires_delta=timedelta(hours=24))

    return jsonify(msg='Usuário logado com sucesso.', token=token)

@jwt_required()
def profile():
    user_id = get_jwt_identity()

    user = service_token.find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    return jsonify(user.to_dict())

@jwt_required()
@validate_profile
def updated_profile():
    data: dict = request.get_json()
    user_id = get_jwt_identity()

    user = service_token.find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
        
    if data.get('password1'):
        password = hash_password(data['password1'])
        user.password = password
    
    user_existed = userService.find_user_profile(data)

    if data['email'] != user.email:
        if data['email'] == user_existed.email:
            return jsonify(msg='Este e-mail já existe no nosso sistema.'), 400
        
    user.cpf = data['cpf']
    user.firstName = data['firstName']
    user.lastName = data['lastName']
    user.email = data['email']

    userService.session.commit()
    
    return jsonify(msg='Usuário atualizado com sucesso.', user=user.to_dict())