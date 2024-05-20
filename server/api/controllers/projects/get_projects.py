from flask import jsonify
from ...models.projects import Projects
from ...database.database_base import db
from ...utils.logging import logger


def get_data_project():
    try:
        # Select only the required columns
        columns = [Projects.title, Projects.description, Projects.date]
        projects = db.session.query(*columns).all()

        if projects:
            # Serialize the data
            serialized_projects = [
                {
                    "Title": project.title,
                    "Description": project.description,
                    "Date": project.date.strftime("%Y-%m-%d %H:%M:%S") if project.date else None
                }
                for project in projects
            ]

            return jsonify(serialized_projects), 200
        else:
            logger.warn("Projects not found")
            return jsonify(message="Projects not found"), 404
    except Exception as e:
        logger.error(f"Error retrieving projects: {e}")
        return jsonify(message="Internal Server Error"), 500