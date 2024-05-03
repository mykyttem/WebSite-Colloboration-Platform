from flask import jsonify
from ...models.projects import Projects
from ...models.users import Users
from ...database.database_base import db


def get_data_project(id):
    info_project = db.session.query(Projects).filter(Projects.id == id).first()

    if info_project:
        # get user names by their IDs
        user_ids = info_project.members

        users = db.session.query(Users).filter(Users.id.in_(user_ids)).all()
        usernames = [user.username for user in users]

        project_dict = {
            "id": info_project.id,
            "title": info_project.title,
            "description": info_project.description,
            "number_of_members": info_project.number_of_members,
            "members": usernames,
            "active": info_project.active,
            "categories": info_project.categories,
            "date": info_project.date.strftime("%Y-%m-%d %H:%M:%S")
        }

        return jsonify([project_dict]), 200
    else:
        return jsonify(message="Not found project"), 404    