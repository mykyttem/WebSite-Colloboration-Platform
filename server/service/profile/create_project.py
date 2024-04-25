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

    projects = db.session.query(Projects).filter(Projects.user_id == id_user).all()
    if projects:
        projects_list = []
        for project in projects:
            projects_dict = {
                "title": project.title,
                "description": project.description,
                "number_of_members": project.number_of_members,
                "active": project.active,
                "categories": project.categories,
                "date": project.date.strftime("%Y-%m-%d %H:%M:%S")
            }
            projects_list.append(projects_dict)
        return jsonify(projects_list), 200
    return jsonify(message="you have not created a project"), 404


def delete_progects():
    id_user = session["user_id"]

    project = db.session.query(Projects).filter(Projects.id == id_user).all()
    db.session.delete(project)
    db.session.commit()

    return jsonify(message="succesfully!"), 200