from flask import make_response, send_file
from ...utils.logging import logger

def select_avatars(fileName):
    try:
        FOLDER = "photos"
        path_avatar = f"{FOLDER}\{fileName}.jpeg"

        response = make_response(send_file(path_avatar, mimetype="image/png/jpg/jpeg"))
        response.headers['Content-Transfer-Encoding']='base64'
        return response
    except:
        logger.warn("Failed select avatars!")