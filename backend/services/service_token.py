from conection import session
from models.User import User


def find_user_by_token(id):
    user = session.query(User).filter_by(id=id).first()

    if not user:
        return
    
    return user