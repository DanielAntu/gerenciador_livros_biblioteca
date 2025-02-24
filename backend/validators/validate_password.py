import re

import bcrypt


def validate_password(password):
    if len(password) < 8:
        return False, 'A senha deve ter pelo menos 8 carecteres.'

    if not re.search(r'[A-Z]', password):
        return False, 'A senha deve conter pelo menos uma letra maiúscula.'
    
    if not re.search(r'[a-z]', password):
        return False, 'A senha deve conter pelo menos uma letra minúscula.'
    
    if not re.search(r'\d', password):
        return False, 'A senha deve conter pelo menos um número.'
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, 'A senha deve conter pelo menos um caractere especial'

    return True, 'Senha válida'

def hash_password(password):
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt)

def check_password(password, hashpassword):
    return bcrypt.checkpw(password.encode('utf-8'), hashpassword)