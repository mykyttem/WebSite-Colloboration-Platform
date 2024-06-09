import datetime
from ..database.database_base import Base, db 

class Reviews(Base):
    author = db.Column(db.Integer, primary_kay=False)
    star = db.Column(db.Integer, nullable=False)
    timecommet = db.Column(db.Datetime, default=datetime.datetime.utcnow, nullable=False)
    description = db.Column(db.Text, nullable=False)


