from flask import Blueprint
from ..controllers.pageProject.data_project import get_data_project
from ..controllers.pageProject.join_project import joining_project


page_project_bp = Blueprint("project", __name__)


@page_project_bp.route("/<int:id>", methods=["GET"])
def info_project(id):
    return get_data_project(id)


@page_project_bp.route("/<int:project_id>/join", methods=["POST"])
def join(project_id):
    return joining_project(project_id)


@page_project_bp.route("/<int:project_id>/leave_project", methods=["POST"])
def leave_project(project_id, id_user):
    return leave_project(project_id, id_user)

