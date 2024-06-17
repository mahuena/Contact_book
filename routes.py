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
@app.route("/api/contacts", methods=['POST'])
def create_contact():
    try:
        # convert the request data to json
        data = request.json

        # make the fields required
        required_fields = ["name", "phoneNumber", "address"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        name = data.get('name')
        phone = data.get('phoneNumber')
        address = data.get('address')
        gender = data.get('gender')
        img_url = data.get('contactImg_url')
        # create a new contact
        new_contact = Contact(name=name, phoneNumber=phone, address=address, gender=gender, contactImg_url=img_url)

        # add and commit new contact to db
        db.session.add(new_contact)
        db.session.commit()

        # jsonify a successful message and return it  / 201 just means a resource has been created
        return jsonify(new_contact.to_json()), 201
    except Exception as e:
        # rollback any pending changes to the database /common practice to maintain data consistency in the database
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# delete a contact from the database
@app.route("/api/contacts/<int:id>", methods=['DELETE'])
def delete_contact(id):
    try:
        # find the contact in the database
        contact = Contact.query.get(id)

        # conditional statement to check if the contact exists
        if contact is None:
            return jsonify({"error": "Contact not found"}), 404
        else:
            # delete the contact from the database
            db.session.delete(contact)
            db.session.commit()
        # jsonify a successful message and return it
        return jsonify({"message": "Contact deleted successfully"}), 200
    except Exception as e:
        # rollback any pending changes to the database
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# update a contact in the database
@app.route("/api/contacts/<int:id>", methods=['PUT'])
def update_contact(id):
    try:
        contact = Contact.query.get(id)

        if contact is None:
            return jsonify({"error": "Contact not found"}), 404

        data = request.json

        # bring back the data and update
        contact.name = data.get("name", contact.name)
        contact.phoneNumber = data.get("phoneNumber", contact.phoneNumber)
        contact.address = data.get("address", contact.address)
        contact.gender = data.get("gender", contact.gender)
        contact.contactImg_url = data.get("contactImg_url", contact.contactImg_url)

        # commit the changes to the database
        db.session.commit()
        return jsonify({"message": "Contact updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
