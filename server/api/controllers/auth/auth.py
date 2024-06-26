from flask import jsonify, request, session
from flask_bcrypt import check_password_hash, generate_password_hash
from ...models.users import Users
from ...database.database_base import db
from ...utils.logging import logger


def sign_up():
    try:
        data = request.json
        PHOTOS_FOLDER = "photos"

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        selected_avatar = data.get("selectedAvatar")
        hashed_password = generate_password_hash(password).decode("utf-8")

        new_user = Users(username=username, password=hashed_password, email=email, avatar=f"{PHOTOS_FOLDER}/{selected_avatar}.jpeg")

        db.session.add(new_user)
        db.session.commit()

        return jsonify(message="Sign up successful"), 200
    except Exception as e:
        logger.error(f"Sign up logged failed {e}")
        return jsonify(message="Sign up failed"), 404
    


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
            logger.warn("Invalid email or password")
            return jsonify(message="Invalid email or password"), 401
    else:
        logger.warn("User not found")
        return jsonify(message="User not found"), 404