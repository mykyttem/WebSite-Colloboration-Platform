from flask import jsonify, request
from ...models.projects import Projects, Project_Mail_Box
from ...database.database_base import db
from ...utils.data_user import get_user_data
from ...utils.project import serialize_project, get_usernames


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


@get_user_data
def get_projects_users(id_user):
    projects = db.session.query(Projects).filter(Projects.user_id == id_user).all()

    if projects:
        info_project = {}

        # main info about project        
        serialized_projects = [serialize_project(project) for project in projects]
        info_project["projects"] = serialized_projects

        # mail box project
        for project in projects:
            mail_box_project = db.session.query(Project_Mail_Box).filter(Project_Mail_Box.project_id == project.id).first()
            
            if mail_box_project:
                # save usernames member who want join to project
                request_join = get_usernames(mail_box_project.requests_join)
                info_project["requests_join"] = [request_join]


        return jsonify(info_project), 200
    else:
        return jsonify(message="you have not created a project"), 404


def delete_progects(id_project):
    project = db.session.query(Projects).filter(Projects.id == id_project).first()
    if project:
        db.session.delete(project)
        db.session.commit()
        return jsonify(message="successfully!"), 200
    return jsonify(message="project not found"), 404