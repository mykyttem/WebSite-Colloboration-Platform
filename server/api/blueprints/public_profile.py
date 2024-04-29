from flask import Blueprint
from ..controllers.public_profile.public_profile import get_data_public_profile

public_profile_bp = Blueprint("public-profile", __name__)


@public_profile_bp.route("/<int:id>", methods=["GET"])
def public_profile(id):
    return get_data_public_profile(id)