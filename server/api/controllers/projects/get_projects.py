from flask import jsonify
from ...models.projects import Projects
from ...models.users import Users
from ...database.database_base import db


def get_data_project():
    projects = db.session.query(Projects).all()

    if projects:
        serialized_projects = []
        for project in projects:
            # get user names by their IDs
            user_ids = project.members

            users = db.session.query(Users).filter(Users.id.in_(user_ids)).all()
            usernames = [user.username for user in users]

            serialized_project = {
                'id': project.id,
                'title': project.title,
                'description': project.description,
                'number_of_members': project.number_of_members,
                'members': usernames,
                'active': project.active,
                'categories': project.categories,
                'date': project.date.strftime("%Y-%m-%d %H:%M:%S") if project.date else None
            }
            serialized_projects.append(serialized_project)
        return jsonify(serialized_projects), 200
    else:
        return jsonify(message="Projects not found"), 404