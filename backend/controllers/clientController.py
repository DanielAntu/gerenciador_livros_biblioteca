from flask import jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from services import clientService
from services.service_token import find_user_by_token
from validators.client_validators import profile_validator, register_validator


@jwt_required()
@register_validator
def register():
    data = request.get_json()

    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Usuário não encontrado.'), 404
    
    if clientService.find_client(data):
        return jsonify(msg='O cliente já existe no sistema.'), 400

    clientService.register(data)

    return jsonify(msg='Cliente salvo com sucesso.'), 201

@jwt_required()
def get_client_by_cpf():
    data: dict = request.get_json()
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Cliente não encontrado.'), 404
    
    if not data.get('cpf'):
        return jsonify(msg='O cpf é obrigatório.'), 400
    
    client = clientService.find_client_by_cpf(data)

    if not client:
        return jsonify(msg='Cliente não encontrado.'), 404
    
    client_dict = client.to_dict()
    
    return jsonify(client_dict)

@jwt_required()
def get_client_by_id(id):
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify(msg='Cliente não encontrado.'), 404
    
    client = clientService.find_client_by_id(id)

    if not client:
        return jsonify(msg='Cliente não encontrado.'), 404
    
    return jsonify(client.to_dict())

@jwt_required()
@profile_validator
def edit_client(id):
    data = request.get_json()
    user_id = get_jwt_identity()

    user = find_user_by_token(user_id)

    if not user:
        return jsonify('Usuário não encontrado.'), 404
    
    client = clientService.find_client_by_id(id)

    if not client:
        return jsonify(msg='Cliente não encontrado.'), 404
    
    client_existed = clientService.client_existed(data)
    
    if data['email'] != client.email:
        print(1)
        if data['email'] == client_existed.email:
            print(2)
            return jsonify(msg='Esse e-mail já esta sendo usado.')
        
    client.firstName = data['firstName']
    client.lastName = data['lastName']
    client.email = data['email']
    client.cpf = data['cpf']
    client.type = data['type']

    clientService.session.commit()
    
    return jsonify(msg='Usuário atualizado com sucesso.', client=client.to_dict())
