import os
from flask import jsonify, session, request
from flask_bcrypt import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from ...models.users import Users
from ...database.database_base import db


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
   
  
def update_data():
    data = request.json
    
    id_user = session["user_id"]
    username = data.get("username")
    email = data.get("email")
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    user = db.session.query(Users).filter(Users.id == id_user).first()
    hashed_password = generate_password_hash(new_password).decode("utf-8")

    if user:
        if check_password_hash(user.password, current_password):
            user.username = username
            user.email = email
            user.password = hashed_password
            db.session.commit()

            return jsonify(message="User data updated successfully"), 200
        else:
            return jsonify(message="password is incorrect"), 401
    else:
        return jsonify(message="User not found"), 404
    

def update_photo():
    UPLOAD_FOLDER = "photos" 

    file = request.files["file"]
    user_id = session["user_id"]
    filename = secure_filename(file.filename)
    
    # Check if the “photos” folder exists. If not, create it.
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    # save
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)  

    # save path photo
    user = db.session.query(Users).filter(Users.id == user_id).first()
    if user:
        user.avatar = file_path  
        db.session.commit()
        return jsonify(message="Photo uploaded successfully"), 200
    else:
        return jsonify(message="User not found"), 404


def log_out():
    del session["user_id"]
    return jsonify(messsage="Logged out successfully")


def del_account():
    id_user = session["user_id"]

    user = db.session.query(Users).filter(Users.id == id_user).first()
    db.session.delete(user)
    db.session.commit()
    del session["user_id"]

    return jsonify(comment="Delete account succesfully!")