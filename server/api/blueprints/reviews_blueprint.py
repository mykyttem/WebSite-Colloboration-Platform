from flask import Blueprint
from ..controllers.profile.reviews import post_reviews

reviews_bp = Blueprint("reviews", __name__)


@reviews_bp.route("/id-profile/<int:id_profile>", methods=["POST"])
def reviews(id_profile):
    return post_reviews(id_profile)
