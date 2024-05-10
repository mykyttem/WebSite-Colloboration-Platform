from flask import Blueprint
from ..controllers.privatePageProject.data_project import get_data_project


private_project_bp = Blueprint("private-project", __name__)


@private_project_bp.route("/<int:id>", methods=["GET"])
def get_project(id):
    return get_data_project(id)