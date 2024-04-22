from flask import Blueprint
from server.service.auth.auth import sign_up, sign_in, check_auth


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/sign-up", methods=["POST"])
def post_sign_up():
    return sign_up()


@auth_bp.route("/sign-in", methods=["POST"])
def post_sign_in():
    return sign_in()


@auth_bp.route("/check-auth", methods=["POST"])
def post_check_auth():
    return check_auth()