from flask import jsonify, request, session
from models.projects import Projects
from database import db


def save_project():
    data = request.json

    id_user = session["user_id"]
    title = data.get("title")
    description = data.get("description")
    number_of_members = data.get("members")
    active = data.get("isActive")
    categories = data.get("categories")
    
    new_project = Projects(title=title, description=description, number_of_members=number_of_members, active=active, categories=categories, user_id=id_user)
    db.session.add(new_project)
    db.session.commit()
    

    return jsonify(message="Project created successful"), 200


def get_projects_users():
    id_user = session["user_id"]
    
    projects = db.session.query(Projects).filter(Projects.user_id == id_user).first()
    projects_dict = {
        "title": projects.title,
        "description": projects.description,
        "number_of_members": projects.number_of_members,
        "active": projects.active,
        "categories": projects.categories,
        "date": projects.date
    }


    return jsonify(projects_dict), 200