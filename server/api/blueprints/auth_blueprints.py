from flask import Blueprint

from ..controllers.auth.auth import sign_up, sign_in
from ..controllers.auth.check_if_auth import check_auth
from ..controllers.auth.select_avatars import select_avatars


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/sign-up", methods=["POST"])
def post_sign_up():
    return sign_up()


@auth_bp.route("/sign-up/select-avatar/<fileName>", methods=["GET"])
def sign_up_select_avatar(fileName):
    return select_avatars(fileName)


@auth_bp.route("/sign-in", methods=["POST"])
def post_sign_in():
    return sign_in()


@auth_bp.route("/check-auth", methods=["POST"])
def post_check_auth():
    return check_auth()