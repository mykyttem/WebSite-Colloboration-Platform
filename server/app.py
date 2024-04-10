from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import declarative_base
from flask_bcrypt import Bcrypt


from config.db_data import uri

app = Flask(__name__)

# TODO: make arhitecture files

# config
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# db
db = SQLAlchemy(app)
engine = create_engine(uri)
migrate = Migrate(app, db)
Base = declarative_base()
bcrypt = Bcrypt(app)


class User(Base):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(20), unique=True, nullable=False)


Base.metadata.create_all(bind=engine)
inspector = inspect(engine)
if "users" in inspector.get_table_names():
    print("tables 'users' created.")
else:
    print("table not created")


@app.route("/auth/sign-up", methods=["POST"])
def sign_up():
    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    new_user = User(username=username, password=hashed_password, email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="Sign up successful"), 200


@app.route("/users", methods=["GET"])
def get_users_data():
    # get all users
    users_data = db.session.query(User).all()

    users_list = []
    for user in users_data:
        user_dict = {
            "id": user.id,
            "username": user.username,
            "password": user.password,
            "email": user.email,
        }
        users_list.append(user_dict)

    return jsonify(users_list), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)