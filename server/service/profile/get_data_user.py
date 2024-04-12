from flask import Blueprint, jsonify, session
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