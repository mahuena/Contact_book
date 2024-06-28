from sqlalchemy.orm import relationship
from app import db
from datetime import datetime


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phoneNumber = db.Column(db.String(10), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(10), nullable=False, default='Not specified')
    contactImg_url = db.Column(db.String(200), nullable=True)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "phoneNumber": self.phoneNumber,
            "address": self.address,
            "gender": self.gender,
            "contactImg_url": self.contactImg_url,
        }


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    contact_id = db.Column(db.Integer, db.ForeignKey('contact.id'), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "message": self.message,
            "date": self.date,
            "contact_id": self.contact_id,
        }


contact = relationship("Contact")
