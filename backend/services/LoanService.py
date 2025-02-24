from conection import session
from models.Client import Client
from models.Loan import Loan


def register(loan_dict):
    loan = Loan(**loan_dict)
    session.add(loan)
    session.commit()

    return loan

def get_loans():
    loans = session.query(Loan).all()

    if not loans:
        return

    return loans

def get_loan_by_id(id):
    loan = session.query(Loan).filter_by(id=id).first()

    if not loan:
        return
    
    return loan

def delete_loan(loan):
    session.delete(loan)
    session.commit()

def search_loan(key):
    loan = session.query(Loan).join(Loan.clients).filter(
        (Client.cpf == key) | (Loan.id == key)
    ).all()

    if not loan:
        return

    return loan

def filter_is_return(search, is_return):
    if int(is_return) == 0:
        is_return_var = False
    else:
        is_return_var = True

    if search != None:
        loan = session.query(Loan).join(Loan.clients).filter(
            ((Client.cpf == search) | (Loan.id == search)) & (Loan.isReturn == is_return_var)
        ).all()

        return loan
    
    loan = session.query(Loan).filter_by(isReturn=is_return_var).all()

    return loan