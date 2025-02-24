from functools import wraps

from flask import jsonify, request


def validate(f):
    @wraps(f)
    def decorate_functions(*args, **kwargs):
        data: dict = request.get_json()

        if not data.get('title'):
            return jsonify(msg='O titulo do livro é obrigatório.'), 400
        
        if not data.get('quant'):
            return jsonify(msg='A quantidade é obrigatória.'), 400
        
        if int(data.get('quant')) <= 0:
            return jsonify(msg='A quantidade precisa ser maio que 0')

        return f(*args, **kwargs)
    
    return decorate_functions