# this is  the file that contains the routes for the backend(create, update, delete, get contacts from database)
from datetime import datetime
from app import app, db
from models import Contact, Note
from flask import request, jsonify


@app.route("/api/contacts", methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    result = [contact.to_json() for contact in contacts]
    return jsonify(result)


# create a new contact in the database
@app.route("/api/contacts", methods=['POST'])
def create_contact():
    try:
        data = request.json
        print("Received data:", data)
        required_fields = ["name", "phoneNumber", "address"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error": f"Missing required field: {field}"}), 400

        new_contact = Contact(
            name=data.get('name'),
            phoneNumber=data.get('phoneNumber'),
            address=data.get('address'),
            gender=data.get('gender'),
            contactImg_url=data.get('contactImg_url'),
            # notes=data.get('notes')
        )

        db.session.add(new_contact)
        db.session.commit()

        # if 'notes' in data:
        #     notes = handle_notes(new_contact.id, data['notes'])
        #     db.session.add_all(notes)
        #     db.session.commit()

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
        contact = Contact.query.get(id)

        if contact is None:
            return jsonify({"error": "Contact not found"}), 404
        else:
            db.session.delete(contact)
            db.session.commit()
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

        contact.name = data.get("name", contact.name)
        contact.phoneNumber = data.get("phoneNumber", contact.phoneNumber)
        contact.address = data.get("address", contact.address)
        contact.gender = data.get("gender", contact.gender)
        contact.contactImg_url = data.get("contactImg_url", contact.contactImg_url)
        # contact.notes = data.get("notes", contact.notes)

        # Note.query.filter_by(contact_id=contact.id).delete()
        #
        # if 'notes' in data:
        #     notes = handle_notes(contact.id, data['notes'])
        #     db.session.add_all(notes)

        db.session.commit()
        return jsonify({"message": "Contact updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# get all notes for a contact
@app.route("/api/notes", methods=['GET'])
def get_notes_for_contact():
    # contact = Contact.query.get(id)

    # if contact is None:
    #     return jsonify({"error": "Contact not found"}), 404
    contact_id = request.args.get('contact_id')
    if contact_id:
        notes = Note.query.filter_by(contact_id=contact_id).all()
    else:
        notes = Note.query.all()
    # notes = Note.query.filter_by(contact_id=id).all()
    result = [note.to_json() for note in notes]
    return jsonify(result)


def validate_note_fields(data):
    # Define the expected types for each field
    expected_types = {
        "message": str,
        "date": str,  # Assuming date is sent as a string in ISO format
        "contact_id": int
    }

    # Check each field
    for field, expected_type in expected_types.items():
        if field not in data:
            print(f"Error: Missing field: {field}")  # print the error message to the console
            return False
        if not isinstance(data[field], expected_type):
            print(f"Error: Incorrect type for field: {field}. Expected {expected_type}, got {type(data[field])}")  # print the error message to the console
            return False

    return True


# # create a note for a contact
@app.route("/api/notes", methods=['POST'])
def create_note_for_contact():
    try:
        data = request.json
        # contact = Contact.query.get(id)
        #
        # if contact is None:
        #     return jsonify({"error": "Contact not found"}), 404

        new_note = Note(
            message=data.get('message'),
            date=data.get('date'),
            contact_id=data.get('contact_id')
        )

        db.session.add(new_note)
        db.session.commit()

        return jsonify(new_note.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# update a note for a contact
@app.route("/api/notes/<int:id>", methods=['PUT'])
def update_note_for_contact(id):
    try:
        note = Note.query.get(id)
        if not note:
            return jsonify({"error": "Note not found"}), 404

        data = request.json

        note.message = data.get("message", note.message)
        note.date = data.get("date", note.date)
        note.contact_id = data.get("contact_id", note.contact_id)

        db.session.commit()
        return jsonify({"message": "Note updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# delete a note for a contact
@app.route("/api/notes/<int:id>", methods=['DELETE'])
def delete_note_for_contact(id):
    try:
        note = Note.query.get(id)

        if note is None:
            return jsonify({"error": "Note not found"}), 404

        db.session.delete(note)
        db.session.commit()
        return jsonify({"message": "Note deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

