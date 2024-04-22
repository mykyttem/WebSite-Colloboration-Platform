from flask import Blueprint
from .get_projects import get_data_project


projects_bp = Blueprint("projects", __name__)


@projects_bp.route("", methods=["GET"])
def projects():
    return get_data_project()