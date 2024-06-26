from flask import jsonify, make_response, send_file
from ...models.users import Users
from ...database.database_base import db
from ...models.projects import Projects
from ...utils.project import serialize_project
from ...utils.logging import logger


def get_data_public_profile(id):
    user = db.session.query(Users).filter(Users.id == id).first()
    deactivates_user = user.is_deactivate

    if deactivates_user is True:
        logger.warn("account deciactivated")
        return jsonify(message="account deciactivated"), 404
    else:
        projects = db.session.query(Projects).filter(Projects.user_id == id).all()
        serialized_projects = [serialize_project(project) for project in projects]

        user_dict = {
            "id": user.id,
            "username": user.username,
            "email": user.email, 
            "projects": serialized_projects
        }


        if user:
            return jsonify(user_dict), 200
        else:
            return jsonify(message="User not found"), 404
    

def get_avatar_public_profile(id):
    try:
        user = db.session.query(Users).filter(Users.id == id).first()
        path_avatar = user.avatar    

        response = make_response(send_file(path_avatar, mimetype="image/png/jpg"))
        response.headers['Content-Transfer-Encoding']='base64'

        return response
    except Exception as e:
        logger.error(f"failed grt avatar public profile {e}")