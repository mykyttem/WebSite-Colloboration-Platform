import datetime
from sqlalchemy.types import JSON
from ..database.database_base import Base, db


class Projects(Base):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    number_of_members = db.Column(db.Integer, nullable=False)
    members = db.Column(JSON, default=list)
    active = db.Column(db.Boolean, nullable=False)
    categories = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


class Project_Mail_Box(Base):
    __tablename__ = "project_mail_box"

    id = db.Column(db.Integer, primary_key=True)

    # save users id
    requests_join = db.Column(JSON, default=list)

    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)