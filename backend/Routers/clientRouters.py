from flask import Blueprint

from controllers.clientController import (edit_client, get_client_by_cpf,
                                          get_client_by_id, register)

client_bp = Blueprint('client', __name__)

client_bp.route('/register', methods=['POST'])(register)
client_bp.route('', methods=['POST'])(get_client_by_cpf)
client_bp.route('/<int:id>')(get_client_by_id)
client_bp.route('/<int:id>', methods=['PUT'])(edit_client)