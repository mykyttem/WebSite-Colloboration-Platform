from flask import Blueprint
from ..controllers.pageProject.data_project import get_data_project


page_project_bp = Blueprint("project", __name__)


@page_project_bp.route("/<int:id>", methods=["GET"])
def info_project(id):
    return get_data_project(id)