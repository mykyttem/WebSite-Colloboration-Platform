import os
from flask import jsonify, session, request
from flask_bcrypt import check_password_hash, generate_password_hash
from werkzeug.utils import secure_filename
from ...database.database_base import db
from ...utils.data_user import get_user_data
from ...utils.logging import logger
from ...models.projects import Project_Mail_Box, Projects


@get_user_data
def update_data(user):
    data = request.json
    
    username = data.get("username")
    email = data.get("email")
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")

    hashed_password = generate_password_hash(new_password).decode("utf-8")

    if user:
        if check_password_hash(user.password, current_password):
            user.username = username
            user.email = email
            user.password = hashed_password
            db.session.commit()

            return jsonify(message="User data updated successfully"), 200
        else:
            logger.warn("password is incorrect")
            return jsonify(message="password is incorrect"), 401
    else:
        logger.warn("User not found")
        return jsonify(message="User not found"), 404
    

@get_user_data
def update_photo(user):
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
    if user:
        user.avatar = f"{UPLOAD_FOLDER}\{filename}"
        db.session.commit()
        return jsonify(message="Photo uploaded successfully"), 200
    else:
        logger.warn("User not found")
        return jsonify(message="User not found"), 404


def log_out():
    del session["user_id"]
    return jsonify(messsage="Logged out successfully")


@get_user_data
def del_account(user, id_user):
    try:
        if user:
            # Find associated projects and delete them
            projects = db.session.query(Projects).filter_by(user_id=id_user).all()
            for project in projects:
                # Delete associated project mailboxes
                db.session.query(Project_Mail_Box).filter_by(project_id=project.id).delete()
                # Delete the project
                db.session.delete(project)

            # Delete the user
            db.session.delete(user)
            db.session.commit()

            del session["user_id"]
            return jsonify(comment="User account and associated projects deleted successfully.")
        else:
            return jsonify(comment="User not found.")
    except Exception as e:
        logger.error(f"Delete account failed! {e}")
        return jsonify(comment="Delete account failed!")


@get_user_data
def deactivate_account(user):
    if user:
        is_deactivate_account = user.is_deactivate

        if is_deactivate_account is False:
            user.is_deactivate = True
            db.session.commit()

            log_out()

            return jsonify(message="deactivate account succesfully"), 200
        else:
            return jsonify(message="deactivate account failed"), 404