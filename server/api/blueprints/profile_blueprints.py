from flask import Blueprint
from ..controllers.profile.get_data_user import get_data, update_data, log_out, del_account, update_photo, get_avatar
from ..controllers.profile.create_project import save_project, get_projects_users, delete_progects, get_editing_projects


profile_bp = Blueprint("profile", __name__)


@profile_bp.route("", methods=["GET"])
def data_user():
    return get_data()


@profile_bp.route("/avatar", methods=["GET"])
def avatar():
    return get_avatar()


@profile_bp.route("/create-project", methods=["POST"])
def create_project_save():
    return save_project()


@profile_bp.route("/update", methods=["POST"])
def update_profile():
    return update_data()


@profile_bp.route("/upload-photo", methods=["POST"])
def upload_photo():
    return update_photo()    


@profile_bp.route("/log-out", methods=["POST"])
def logout():
    return log_out()


@profile_bp.route("/del-account", methods=["POST"])
def delete_account():
    return del_account()


@profile_bp.route("/projects", methods=["GET"])
def get_projects():
    return get_projects_users()


@profile_bp.route("/edit-project/<int:id_project>", methods=["POST"])
def get_editing_project(id_project):
    return get_editing_projects(id_project)


@profile_bp.route("/delete-projects/<int:id_project>", methods=["DELETE"])
def get_delete_projects(id_project):
    return delete_progects(id_project)