from ast import parse

from app import app, db
from models import Contact, Note
from flask import request, jsonify


@app.route("/api/contacts", methods=['GET'])
def get_contacts():
    contacts = Contact.query.all()
    result = [contact.to_json() for contact in contacts]
    return jsonify(result)


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
            contactImg_url=data.get('contactImg_url')
        )
        db.session.add(new_contact)
        db.session.commit()
        return jsonify({"message": "Contact added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


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
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route("/api/contacts/<int:id>", methods=['PUT'])
def update_contact(id):
    try:
        contact = Contact.query.get(id)
        if contact is None:
            return jsonify({"error": "Contact not found"}), 404
        else:
            data = request.json
            contact.name = data.get("name", contact.name)
            contact.phoneNumber = data.get("phoneNumber", contact.phoneNumber)
            contact.address = data.get("address", contact.address)
            contact.gender = data.get("gender", contact.gender)
            contact.contactImg_url = data.get("contactImg_url", contact.contactImg_url)
            db.session.commit()
        return jsonify({"message": "Contact updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route("/api/notes", methods=['GET'])
def get_notes_for_contact():
    contact_id = request.args.get('contact_id')
    if contact_id:
        notes = Note.query.filter_by(contact_id=contact_id).all()
    else:
        notes = Note.query.all()
    # notes = Note.query.filter_by(contact_id=id).all()
    result = [note.to_json() for note in notes]
    return jsonify(result)


def validate_note_fields(data):
    expected_types = {
        "message": str,
        "date": str,
        "contact_id": int
    }

    for field, expected_type in expected_types.items():
        if field not in data:
            print(f"Error: Missing field: {field}")
            return False
        if not isinstance(data[field], expected_type):
            print(
                f"Error: Incorrect type for field: {field}. Expected {expected_type}, got {type(data[field])}")
            return False

    return True


def create_note_from_dict(data):
    if not validate_note_fields(data):
        return None
    new_note = Note(
        message=data.get('message'),
        date=parse(data.get('date')),
        contact_id=data.get('contact_id')
    )
    return new_note


@app.route("/api/notes", methods=['POST'])
def create_note_for_contact():
    try:
        data = request.json
        if isinstance(data, list):
            for item in data:
                new_note = create_note_from_dict(item)
                if new_note is None:
                    return jsonify({"error": "Invalid data item"}), 400
                db.session.add(new_note)
        elif isinstance(data, dict):
            new_note = create_note_from_dict(data)
            if new_note is None:
                return jsonify({"error": "Invalid data data"}), 400
            db.session.add(new_note)
        else:
            return jsonify({"error": "Expected object or list, got something else"}), 400

        db.session.commit()
        return jsonify({"message": "Note(s) added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 400


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
