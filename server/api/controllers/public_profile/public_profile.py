from flask import jsonify
from ...models.users import Users
from ...database.database_base import db
from ...models.projects import Projects


def get_data_public_profile(id):
    user = db.session.query(Users).filter(Users.id == id).first()
    projects = db.session.query(Projects).filter(Projects.user_id == id).all()
    projects_list = []

    user_dict = {
        "id": user.id,
        "username": user.username,
        "email": user.email, 
        "projects": projects_list
    }

    if projects:
        for project in projects:
            user_id = project.members

            members = db.session.query(Users).filter(Users.id.in_(user_id)).all()
            usernames = [member.username for member in members]

            projects_dict = {
                "id": project.id,
                "title": project.title,
                "description": project.description,
                "number_of_members": project.number_of_members,
                "members": usernames,
                "active": project.active,
                "categories": project.categories,
                "date": project.date.strftime("%Y-%m-%d %H:%M:%S")
            }
            projects_list.append(projects_dict)

    if user:
        return jsonify(user_dict), 200
    else:
        return jsonify(message="User not found"), 404
    

    