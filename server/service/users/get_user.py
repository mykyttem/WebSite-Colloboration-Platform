from flask import Blueprint, jsonify
from database import db
from models.users import Users

users_bp = Blueprint("users", __name__)


@users_bp.route("/get-all", methods=["GET"])
def get_users_data():
    # get all users
    users_data = db.session.query(Users).all()

    users_list = []
    for user in users_data:
        user_dict = {
            "id": user.id,
            "username": user.username,
            "password": user.password,
            "email": user.email,
        }
        users_list.append(user_dict)

    return jsonify(users_list), 200