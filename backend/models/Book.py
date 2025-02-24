from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from conection import Base


class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(200), nullable=True)
    quant = Column(Integer, nullable=True)

    loans = relationship('Loan', back_populates='books', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'quant': self.quant
        }