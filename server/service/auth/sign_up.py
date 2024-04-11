from flask import Blueprint, jsonify, request, session, redirect
from flask_bcrypt import check_password_hash, generate_password_hash
from models.users import Users
from database import db


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/sign-up", methods=["POST"])
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


