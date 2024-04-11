from flask import Blueprint, jsonify, request
from models.users import Users
from database import db

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/", methods=["POST"])
def get_data():
    data = request.json
    id_user = data.get("user_id")

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