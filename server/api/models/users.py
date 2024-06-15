from datetime import datetime
from ..database.database_base import Base, db

class Users(Base):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(20), unique=True, nullable=False)
    avatar = db.Column(db.String(250), unique=False, nullable=True)
    is_deactivate = db.Column(db.Boolean(), unique=False, nullable=False, default=False)
    created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    location = db.Column(db.String(20), nullable=True)
    bio = db.Column(db.String(250), nullable=True)

    projects = db.relationship('Projects', backref='users', lazy=True)