from flask import jsonify, make_response, send_file
from ...models.users import Users
from ...database.database_base import db
from ...models.projects import Projects
from ...utils.project import serialize_project


def get_data_public_profile(id):
    user = db.session.query(Users).filter(Users.id == id).first()
    projects = db.session.query(Projects).filter(Projects.user_id == id).all()


    if projects:
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
    user = db.session.query(Users).filter(Users.id == id).first()
    path_avatar = user.avatar    

    response = make_response(send_file(path_avatar, mimetype="image/png/jpg"))
    response.headers['Content-Transfer-Encoding']='base64'

    return response