from flask import jsonify, make_response, send_file
from ...utils.data_user import get_user_data
from ...utils.logging import logger


@get_user_data
def get_data(user):
    user_dict = {
        "id": user.id,
        "username": user.username,
        "location": user.location,
        "bio": user.bio,
        "created": user.created,
        "password": user.password,
        "email": user.email
    }

    if user:
        return jsonify(user_dict), 200
    else:
        logger.warn("User not found")
        return jsonify(message="User not found"), 404
   

@get_user_data
def get_avatar(user):
    try:
        path_avatar = user.avatar

        response = make_response(send_file(path_avatar, mimetype="image/png/jpg"))
        response.headers['Content-Transfer-Encoding']='base64'
        return response
    except Exception as e:
        logger.error(f"failed send file {e}")