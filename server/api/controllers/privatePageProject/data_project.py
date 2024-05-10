from flask import jsonify
from ...models.projects import Projects, Project_Mail_Box
from ...database.database_base import db
from ...utils.logging import logger
from ...utils.project import serialize_project, get_usernames


def get_data_project(id):
    try:
        project = db.session.query(Projects).filter(Projects.id == id).first()

        if project:
            info_project = {}

            serialized_project = serialize_project(project)
            info_project["project"] = serialized_project

            mail_box_project = db.session.query(Project_Mail_Box).filter(Project_Mail_Box.project_id == project.id).first()

            if mail_box_project:
                # save usernames member who want join to project
                request_join = get_usernames(mail_box_project.requests_join)
                info_project["requests_join"] = [request_join]

            return jsonify(info_project), 200
    except:
        logger.error("Error get data private project")
        return jsonify(message="Failed get data project"), 404