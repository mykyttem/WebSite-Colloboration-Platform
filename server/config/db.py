from flask_sqlalchemy import SQLAlchemy
from app import app

user_name = 'username'
password = '|JHYD&*F@DckjAnsdjidhas'

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{user_name}:{password}@localhost/db'
db = SQLAlchemy(app)