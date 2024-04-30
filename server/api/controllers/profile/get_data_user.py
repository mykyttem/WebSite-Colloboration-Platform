import os
from flask import jsonify, session, request, make_response, send_file
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
   
def get_avatar():
    id_user = session["user_id"]
    user = db.session.query(Users).filter(Users.id == id_user).first()
    path_avatar = user.avatar

    response = make_response(send_file(path_avatar, mimetype="image/png/jpg"))
    response.headers['Content-Transfer-Encoding']='base64'

    return response


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
    USER_ID = session["user_id"]
    file = request.files["file"]

    UPLOAD_FOLDER = "photos" 
    UPLOAD_CREATE_FOLDER = "api\photos"
    PATH = f"{USER_ID}\{file.filename}"

    filename = secure_filename(PATH)
    
    # Check if the “photos” folder exists. If not, create it.
    if not os.path.exists(UPLOAD_CREATE_FOLDER):
        os.makedirs(UPLOAD_CREATE_FOLDER)

    # save
    file_path = os.path.join(UPLOAD_CREATE_FOLDER, filename)
    file.save(file_path)  

    # save path photo
    user = db.session.query(Users).filter(Users.id == USER_ID).first()
    if user:
        user.avatar = f"{UPLOAD_FOLDER}\{filename}"
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