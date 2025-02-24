from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from conection import Base


class Loan(Base):
    __tablename__ = 'loans'

    id = Column(Integer, primary_key=True, autoincrement=True)
    clientId = Column(Integer, ForeignKey('clients.id', ondelete='CASCADE'), nullable=True)
    bookId = Column(Integer, ForeignKey('books.id', ondelete='CASCADE'), nullable=True)
    dateLoan = Column(String(10), nullable=True)
    dateReturn = Column(String(10), nullable=True)
    isReturn = Column(Boolean, nullable=True)

    clients = relationship('Client', back_populates='loans')
    books = relationship('Book', back_populates='loans')

    def to_dict(self):
        return {
            'id': self.id,
            'book': self.books.title,
            'cpfClient': f'{self.clients.cpf[:3]}.{self.clients.cpf[3:6]}.{self.clients.cpf[6:9]}-{self.clients.cpf[9:]}',
            'dateLoan': self.dateLoan,
            'dateReturn': self.dateReturn,
            'isReturn': self.isReturn
        }

    def to_dict_details(self):
        return {
            'id': self.id,
            'title': self.books.title,
            'nameClient': f'{self.clients.firstName} {self.clients.lastName}',
            'cpf': f'{self.clients.cpf[:3]}.{self.clients.cpf[3:6]}.{self.clients.cpf[6:9]}-{self.clients.cpf[9:]}',
            'email': self.clients.email,
            'dateLoan': self.dateLoan,
            'dateReturn': self.dateReturn,
            'isReturn': self.isReturn
        }