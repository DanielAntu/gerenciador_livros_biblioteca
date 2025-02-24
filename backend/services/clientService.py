from conection import session
from models.Client import Client


def register(data: dict):
    client = Client(**data)
    session.add(client)
    session.commit()

def find_client(data: dict):
    session_query = session.query(Client)

    client = session_query.filter(
        (Client.cpf == data['cpf']) | (Client.email == data['email'])
    ).first()

    if not client:
        return
    
    return client

def find_client_by_cpf(data):
    client = session.query(Client).filter_by(cpf=data['cpf']).first()

    if not client:
        return
    
    return client

def find_client_by_id(id):
    client = session.query(Client).filter_by(id=id).first()

    if not client:
        return
    
    return client

def client_existed(data: dict):
    client = session.query(Client).filter_by(email=data['email']).first()

    if not client:
        return
    
    return client