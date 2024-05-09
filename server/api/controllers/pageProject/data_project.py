from flask import jsonify
from ...models.projects import Projects
from ...database.database_base import db
from ...utils.project import serialize_project
from ...utils.logging import logger


def get_data_project(id):
    project = db.session.query(Projects).filter(Projects.id == id).first()

    if project:
        serialized_project = serialize_project(project)
        return jsonify([serialized_project]), 200
    else:
        logger.warn("Project not found")
        return jsonify(message="Project not found"), 404