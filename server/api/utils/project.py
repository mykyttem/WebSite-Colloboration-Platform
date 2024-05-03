import datetime
from ..models.users import Users
from ..database.database_base import db


def get_usernames(user_ids):
    users = db.session.query(Users).filter(Users.id.in_(user_ids)).all()
    return [user.username for user in users]


def serialize_project(project):
    project_dict = {}
    for key in project.__mapper__.columns.keys():
        value = getattr(project, key)
        if key == 'members':
            value = get_usernames(value)
        elif isinstance(value, datetime.datetime):
            value = value.strftime("%Y-%m-%d %H:%M:%S")
        project_dict[key] = value
    return project_dict