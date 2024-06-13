from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# create an instance of the Flask class
app = Flask(__name__)
CORS(app)

# configure the database
# the database is a sqlite database (C-language library)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///address_book.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# import the routes (way of importing when a python file doesn't have a class to import)
import routes

# create the database table
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)
