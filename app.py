from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)

# or you can restrict it to specific origins and routes
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000/contact-app/"}})

# configure the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///address_book.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# migrate changes to db
migrate = Migrate(app, db)

import routes

# create the database table
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
