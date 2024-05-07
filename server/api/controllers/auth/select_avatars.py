from flask import make_response, send_file


def select_avatars(fileName):
    FOLDER = "photos"
    path_avatar = f"{FOLDER}\{fileName}.jpeg"
    path_mouse = f"{FOLDER}\mouse.jpeg"

    response = make_response(send_file(path_avatar, mimetype="image/png/jpg/jpeg"))
    response.headers['Content-Transfer-Encoding']='base64'

    return response