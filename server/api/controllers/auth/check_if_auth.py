from flask import jsonify, session
from ...utils.logging import logger


def check_auth():
    if "user_id" in session:  
        return jsonify(message="user auth successful"), 200
    else:
        logger.warn("user not auth")
        return jsonify(message="user not auth"), 401  