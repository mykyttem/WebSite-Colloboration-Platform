from flask import jsonify, session


def check_auth():
    if "user_id" in session:  
        return jsonify(message="user auth successful"), 200
    else:
        return jsonify(message="user not auth"), 401  