from dotenv import dotenv_values
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restx import Api
from flask_sqlalchemy import SQLAlchemy
import os

# env = dotenv_values(".env")
# class Config:
#     MYSQL_USERNAME = env["MYSQL_USERNAME"]
#     MYSQL_PASSWORD = env["MYSQL_PASSWORD"]
#     MYSQL_HOST = env["MYSQL_HOST"]
#     MYSQL_PORT = env["MYSQL_PORT"]
#     MYSQL_DB = env["MYSQL_DB"]

class Config:
    MYSQL_USERNAME = os.environ["MYSQL_USERNAME"]
    MYSQL_PASSWORD = os.environ["MYSQL_PASSWORD"]
    MYSQL_HOST = os.environ["MYSQL_HOST"]
    MYSQL_PORT = os.environ["MYSQL_PORT"]
    MYSQL_DB = os.environ["MYSQL_DB"]


SQLALCHEMY_DATABASE_URL = f"mysql+mysqlconnector://{Config.MYSQL_USERNAME}:{Config.MYSQL_PASSWORD}@" \
                          f"{Config.MYSQL_HOST}:{Config.MYSQL_PORT}/{Config.MYSQL_DB}"
app = Flask(__name__)
CORS(app, supports_credentials=True)  # Allow all domains on all routes (for development)

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URL
app.config['JWT_SECRET_KEY'] = os.environ["JWT_SECRET_KEY"]
description = (
    'Wishhub App is web application where each user can manage their personal wishlist and explore wishlists of other users'
    'Build with Flask REST API App with JWT Authentication and SQLAlchemy ORM '
)
rest_app = Api(app=app, version='1.0',
               title='Wishhub App',
               description=description)

database_space = rest_app.namespace('api/database', description="Database")
wish_space = rest_app.namespace('api/wish', description="CRUD Wish")
user_space = rest_app.namespace('api/auth', description="CRUD User")
db = SQLAlchemy(app)
jwt = JWTManager(app)
from router import *

if __name__ == '__main__':
    app.run()
