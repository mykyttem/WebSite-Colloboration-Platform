from flask import Blueprint, make_response
from ..controllers.privatePageProject.data_project import get_data_project
from ..controllers.privatePageProject.accept_user import UserAcceptance


private_project_bp = Blueprint("private-project", __name__)


@private_project_bp.route("/<int:id>", methods=["GET"])
def get_project(id):
    return get_data_project(id)


@private_project_bp.route("/<int:id>/accept-user/<int:idUser>", methods=["POST"])
def post_accept_user(id, idUser):
    user_acceptance = UserAcceptance(id, idUser)
    response = user_acceptance.accept_user()
    
    return make_response(response)