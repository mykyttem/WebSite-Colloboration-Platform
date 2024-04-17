from flask import Blueprint, jsonify, session, request
from models.users import Users
from database import db

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("", methods=["GET"])
def get_data():
    id_user = session["user_id"]

    user = db.session.query(Users).filter(Users.id == id_user).first()
    user_dict = {
        "id": user.id,
        "username": user.username,
        "password": user.password,
        "email": user.email  
    }


    if user:
        return jsonify(user_dict), 200
    else:
        return jsonify(message="User not found"), 404
    

@profile_bp.route("", methods=["POST"])
def update_data():
    if id_user not in session:
        return jsonify(message="User not authenticated"), 401

    id_user = session["user_id"]
    data = request.json

    user = db.session.query(Users).filter(Users.id == id_user).first()

    if user is not None:
        if "username" in data:
            user.username = data["username"]
        if "email" in data:
            user.email = data["email"]
        if "password" in data:
            user.password = data["password"]

        db.session.commit()

        return jsonify(message="User data updated successfully"), 200
    else:
        return jsonify(message="User not found"), 404
