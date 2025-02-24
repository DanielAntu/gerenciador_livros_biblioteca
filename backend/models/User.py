from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from conection import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    firstName = Column(String(100), nullable=True)
    lastName = Column(String(100), nullable=True)
    email = Column(String(200), nullable=True, unique=True)
    cpf = Column(String(11), unique=True, nullable=True)
    password = Column(String(100), nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'cpf': self.cpf
        }