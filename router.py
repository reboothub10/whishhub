import datetime
import logging
import jwt
from datetime import timedelta
from flask import request, jsonify, redirect
from flask_jwt_extended import create_access_token, jwt_required
from app import db, app, database_space, user_space, wish_space
from models import User, Wish, WishGroup
from flask_restx import Resource
from flask import Response


@app.route('/swagger')
def swagger_ui():
    return redirect('/static/swagger.html')

@app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()


def get_user_id_from_token():
    token = request.headers.get("Authorization")
    if token:
        token = token.split(" ")[1]
        try:
            payload = jwt.decode(token, app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
            user_id = payload["sub"]["user_id"]
            return user_id
        except:
            return
    return


def is_admin():
    if get_user_id_from_token() == 0:
        return True
    return False


def reset_db():
    db.drop_all()
    db.create_all()
    db.session.commit()
    wishgroup_csv = open("initDB/categories.csv", "r")
    wishgroup_csv.readline()
    for line in wishgroup_csv:
        line = line.split(",")
        line[-1] = line[-1][:-1]
        wishgroup = WishGroup(line[0], line[1])
        db.session.add(wishgroup)
    db.session.commit()


@database_space.route("/reset-database", methods=["GET", "POST", "OPTIONS"])
class ResetDatabase(Resource):
    @database_space.doc(
        summary="Reset database",
        description="Reset database to initial state (only for admin)",
    )
    def post(self):
        """Reset the database"""
        reset_db()
        return {"message": "Database reset"}, 200


@user_space.route("/user", methods=["GET", "POST", "OPTIONS"])
class UserByToken(Resource):
    @user_space.header("Authorization", "JWT Token", required=True)
    @user_space.doc(
        summary="Get a current user",
        description="This endpoint allows you to get a current user by token.",
        params={
            'Authorization': {
                'in': 'header',
                'description':
                    'Input your JWT token by adding "Bearer " then your token'
            }})
    @jwt_required()
    def get(self):
        user_id = get_user_id_from_token()
        user = User.query.filter_by(id=user_id).first()
        return {"success": "true", "user": user.to_dict()}, 200



@user_space.route("/login", methods=["POST", "OPTIONS"])
class Login(Resource):
    @user_space.doc(
        summary="Login",
        description="This endpoint returns a JWT token to be used for authentication. The JWT token is valid for 1 hour.",
        params={
            'body': {
                'in': 'body',
                'description':
                    'Input your email and password',
                'schema': {
                    'type': 'object',
                    'properties': {
                        'email': {
                            'type': 'string'
                        },
                        'password': {
                            'type': 'string'
                        }
                    },
                    'required': ['email', 'password']
                }}})
    def post(self):
        """Login to the system and get a JWT token (valid for 1 hour) to access the other endpoints"""
        data = request.get_json()

        user = User.query.filter_by(email=data["email"]).first()
        if user and user.password == data["password"]:
            payload = {
                "user_id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
            }
            access_token = create_access_token(identity=payload, expires_delta=timedelta(days=1), fresh=True)
            return {"success": "true", "token": access_token}, 200


@user_space.route("/register", methods=["GET", "POST", "OPTIONS"])
class Register(Resource):
    @user_space.doc(
        summary="Register",
        description="This endpoint allows you to register a new user.",
        params={
            'body': {
                'in': 'body',
                'description':
                    'Input your name, email, industry, gender, age_group and password. The id will be automatically generated. ',
                'schema': {
                    'type': 'object',
                    'properties': {
                        'name': {
                            'type': 'string'
                        },
                        'email': {
                            'type': 'string'
                        },
                        'industry': {
                            'type': 'string'
                        },
                        'gender': {
                            'type': 'string'
                        },
                        'age_group': {
                            'type': 'string'
                        },
                        'password': {
                            'type': 'string'
                        }
                    },
                    'required': ['name', 'email', 'industry', 'gender', 'age_group', 'password']
                }}})
    def post(self):
        """Register a new user"""
        data = request.get_json()
        user = User.query.filter_by(name=data["email"]).first()
        if user:
            return {"message": "email taken"}, 400
        user = User(
            name=data["username"],
            email=data["email"],
            industry=data["industry"],
            gender=data["gender"],
            age_group=data["age_group"],
            password=data["password"],
        )
        db.session.add(user)
        db.session.commit()
        return {"success": "true", "user": user.to_dict()}, 200


@wish_space.route("/list", methods=["GET", "POST", "OPTIONS"])
class Wishes(Resource):
    @wish_space.header("Authorization", "JWT Token", required=True)
    @wish_space.doc(
        summary="Get all wishes for the current user",
        description="This endpoint allows you to get all wish for the authenticated user.",
        params={
            'Authorization': {
                'in': 'header',
                'description':
                    'Input your JWT token by adding "Bearer " then your token'
            }})
    @jwt_required()
    def get(self):
        user_id = get_user_id_from_token()
        wishes = Wish.query.filter_by(user_id=user_id).all()
        return {
            "success": "true",
            "wishlist": [obj.to_dict() for obj in wishes]
        }, 200
    
@wish_space.route("/add", methods=["GET", "POST", "OPTIONS"])
class AddWish(Resource):
    @wish_space.header("Authorization", "JWT Token", required=True)
    @wish_space.doc(
        summary="Add a wish",
        description="This endpoint allows you to add a wish.",
        params={
            'Authorization': {
                'in': 'header',
                'description':
                    'Input your JWT token by adding "Bearer " then your token'
            },
            'body': {
                'in': 'body',
                'description':
                    'Input your wish name, group_id, url ',
                'schema': {
                    'type': 'object',
                    'properties': {
                        'name': {
                            'type': 'string'
                        },
                        'group_id': {
                            'type': 'integer'
                        },
                        'url': {
                            'type': 'string'
                        }
                    },
                    'required': ['name', 'group_id', 'url']
                }}})
    @jwt_required()
    def post(self):
        data = request.get_json()
        user_id = get_user_id_from_token()

        # wish = Wish.query.filter_by(name=data["name"]).first()
        
        # if wish:
        #     return {"message": "wish already exists"}, 400
        wish = Wish(
            name=data["title"],
            url=data["content"],
            group_id=data["wishgroup_id"],
            user_id=user_id
        )
        logging.error(wish)
        db.session.add(wish)
        db.session.commit()
        return {"success": "true", "wish": wish.to_dict()}, 200