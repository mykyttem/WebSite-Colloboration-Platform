from flask import Flask
from flask_migrate import Migrate 
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import declarative_base

from .database.database_base import db
from .database.db_data import uri
from .blueprints.auth_blueprints import auth_bp
from .blueprints.profile_blueprints import profile_bp
from .blueprints.projects_blueprints import projects_bp


app = Flask(__name__)

# blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(profile_bp, url_prefix="/profile")
app.register_blueprint(projects_bp, url_prefix="/projects")

# config
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'super_secret_key'

# db
migrate = Migrate(app, db)

engine = create_engine(uri)
Base = declarative_base()
Base.metadata.create_all(bind=engine)

# tables
inspector = inspect(engine)
table_names = inspector.get_table_names()

if "users" in table_names and "projects" in table_names:
    print("Tables 'users' and 'projects' created")
elif "users" in table_names:
    print("Table 'users' created, but 'projects' is missing")
elif "projects" in table_names:
    print("Table 'projects' created, but 'users' is missing")
else:
    print("Tables 'users' and 'projects' are missing")