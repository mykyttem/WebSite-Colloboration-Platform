from flask import jsonify, request
from ...models.projects import Projects
from ...database.database_base import db
from ..utils.data_user import get_user_data


@get_user_data
def save_project(id_user):
    data = request.json

    title = data.get("title")
    description = data.get("description")
    number_of_members = data.get("members")
    active = data.get("isActive")
    categories = data.get("categories")
    
    new_project = Projects(title=title, description=description, number_of_members=number_of_members, active=active, categories=categories, user_id=id_user)
    db.session.add(new_project)
    db.session.commit()

    return jsonify(message="Project created successful"), 200