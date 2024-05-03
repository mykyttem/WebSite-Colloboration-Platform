from flask import jsonify
from ...models.projects import Projects
from ...database.database_base import db
from ...utils.project import serialize_project


def get_data_project():
    projects = db.session.query(Projects).all()

    if projects:
        serialized_projects = [serialize_project(project) for project in projects]
        return jsonify(serialized_projects), 200
    else:
        return jsonify(message="Projects not found"), 404