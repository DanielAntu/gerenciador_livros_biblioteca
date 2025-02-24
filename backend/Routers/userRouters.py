from flask import Blueprint

from controllers.userController import (login, profile, register,
                                        updated_profile)

user_bp = Blueprint('user', __name__)

user_bp.route('/register', methods=['POST'])(register)
user_bp.route('/login', methods=['POST'])(login)
user_bp.route('/profile')(profile)
user_bp.route('/edit', methods=['PUT'])(updated_profile)
