import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from conection import Base, engine
from Routers.bookRouters import book_bp
from Routers.clientRouters import client_bp
from Routers.LoanRouter import loan_bp
from Routers.userRouters import user_bp

Base.metadata.create_all(engine)
load_dotenv()

app = Flask(__name__)

secret_key = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = secret_key

jwt = JWTManager(app)

CORS(app)

app.register_blueprint(user_bp, url_prefix='/api/user')
app.register_blueprint(client_bp, url_prefix='/api/client')
app.register_blueprint(book_bp, url_prefix='/api/book')
app.register_blueprint(loan_bp, url_prefix='/api/loan')

if __name__ == '__main__':
    app.run(debug=True)