from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from conection import Base


class Client(Base):
    __tablename__ = 'clients'

    id = Column(Integer, primary_key=True, autoincrement=True)
    firstName = Column(String(100), nullable=True)
    lastName = Column(String(100), nullable=True)
    email = Column(String(200), nullable=True, unique=True)
    cpf = Column(String(11), unique=True, nullable=True)
    type = Column(String(20), nullable=True)

    loans = relationship('Loan', back_populates='clients', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'cpf': self.cpf,
            'type': self.type
        }