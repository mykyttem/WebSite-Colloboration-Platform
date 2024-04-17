import datetime
from database import Base, db


class Projects(Base):
    __tablename__ = "projects"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    number_of_members = db.Column(db.Integer, nullable=False)
    active = db.Column(db.Boolean, nullable=False)
    categories = db.Column(db.String(255), nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.utcnow, nullable=False)