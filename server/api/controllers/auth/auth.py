from flask import jsonify, request, session
from flask_bcrypt import check_password_hash, generate_password_hash
from ...models.users import Users
from ...database.database_base import db


def sign_up():
    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    hashed_password = generate_password_hash(password).decode("utf-8")

    new_user = Users(username=username, password=hashed_password, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="Sign up successful"), 200


def sign_in():
    data = request.json

    email = data.get("email")
    password = data.get("password")
    
    user = db.session.query(Users).filter_by(email=email).first()

    if user:
        if check_password_hash(user.password, password):
            session["user_id"] = user.id
            return jsonify(message="Sign in successful"), 200
        else:
            return jsonify(message="Invalid email or password"), 401
    else:
        return jsonify(message="User not found"), 404