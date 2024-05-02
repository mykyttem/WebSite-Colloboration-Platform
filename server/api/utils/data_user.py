from functools import wraps
from flask import jsonify, session
from ..models.users import Users
from ..database.database_base import db


def get_user_data(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return jsonify(message="You need to be logged in"), 401

        id_user = session["user_id"]
        user = db.session.query(Users).filter(Users.id == id_user).first()
        if user:
            # сhecking if a function requires in its arguments
            if 'user' in f.__code__.co_varnames:
                kwargs['user'] = user
            if 'id_user' in f.__code__.co_varnames:
                kwargs['id_user'] = id_user
            return f(*args, **kwargs)
        else:
            return jsonify(message="User not found"), 404
    return decorated_function