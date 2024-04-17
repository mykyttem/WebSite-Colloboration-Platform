from flask import Blueprint
from .get_data_user import get_data
from .create_project import save_project


profile_bp = Blueprint("profile", __name__)


@profile_bp.route("", methods=["GET"])
def data_user():
    return get_data()


@profile_bp.route("/create-project", methods=["POST"])
def create_project_save():
    return save_project()