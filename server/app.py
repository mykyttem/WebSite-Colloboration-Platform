from api.api import app
from api.database.database_base import db


if __name__ == "__main__":
    with app.app_context():
        db.init_app(app)
        db.create_all()
    app.run(debug=True)