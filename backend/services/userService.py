from conection import session
from models.User import User


def register(data: dict):
    user = User(**data)
    session.add(user)
    session.commit()

def find_user(data: dict):
    session_query = session.query(User)

    user = session_query.filter(
        (User.cpf == data['cpf']) | (User.email == data['email'])
    ).first()

    

    if not user:
        return
    
    return user

def find_user_login(data: dict):
    session_query = session.query(User)

    user = session_query.filter(
        (User.cpf == data['identity']) | (User.email == data['identity'])
    ).first()

    if not user:
        return
    
    return user

def find_user_profile(data: dict):
    session_query = session.query(User)

    user = session_query.filter_by(email=data['email']).first()

    if not user:
        return
    
    return user