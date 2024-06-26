from flask import Flask
from flask_migrate import Migrate 
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import declarative_base

from .database.database_base import db
from .database.db_data import uri
from .database.checking_tables import check_is_creating_tables

from .blueprints.auth_blueprints import auth_bp
from .blueprints.profile_blueprints import profile_bp
from .blueprints.projects_blueprints import projects_bp
from .blueprints.public_profile_blueprints import public_profile_bp
from .blueprints.page_project_blueprints import page_project_bp
from .blueprints.private_project import private_project_bp


app = Flask(__name__)

# blueprints
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(profile_bp, url_prefix="/profile")
app.register_blueprint(public_profile_bp, url_prefix="/public-profile")
app.register_blueprint(projects_bp, url_prefix="/projects")
app.register_blueprint(page_project_bp, url_prefix="/project")
app.register_blueprint(private_project_bp, url_prefix="/private-project")

# config
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'super_secret_key'

# db
migrate = Migrate(app, db)

engine = create_engine(uri)
inspector = inspect(engine)

Base = declarative_base()
Base.metadata.create_all(bind=engine)

check_is_creating_tables(inspector)
