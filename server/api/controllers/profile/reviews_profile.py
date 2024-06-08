from ...utils.data_user import get_user_data
from flask import Flask, request, jsonify
from ...utils.logging import logger
from ...models.reviews import Reviews
from ...database.database_base import db

@get_user_data
def post_reviews(id_profile, id_user):
    try:
        data = request.json

        star_data = data.get("Star")
        timecomment_data = data.get("Time")
        description_data = data.get("Description")

        reviesws_data = Reviews(author_id=id_user, description_data=description_data, star_data=star_data, timecomment_data=timecomment_data)
        db.session.add(reviesws_data)
        db.session.commit()
        return jsonify(message="succesfully"), 200
    except:
        logger.error("error post reviews")
        return jsonify(message="error post reviews"), 400