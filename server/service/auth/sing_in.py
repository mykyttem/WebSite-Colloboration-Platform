from flask import Blueprint, jsonify, request, session, redirect
from flask_bcrypt import check_password_hash, generate_password_hash
from models.users import Users
from database import db



@auth_bp.route("/sign-in", methods=["POST"])
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