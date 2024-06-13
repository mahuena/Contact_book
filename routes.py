# this is  the file that contains the routes for the backend(create, update, delete, get contacts from database)


from app import app, db
from models import Contact
from flask import request, jsonify


# get all contacts from the database
@app.route("/api/contacts", methods=['GET'])
def get_contacts():
    # get all contacts from the database
    contacts = Contact.query.all()
    # look through the contacts that has attributes listed in models and convert each of them to json
    result = [contact.to_json() for contact in contacts]
    return jsonify(result)

# create a new contact in the database
