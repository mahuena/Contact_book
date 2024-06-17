from app import db


# create a class Contact that inherits from db.Model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phoneNumber = db.Column(db.Integer, nullable=False)
    address = db.Column(db.String(100), nullable=False)
    gender = db.Column(db.String(10), nullable=False, default='Not specified')
    contactImg_url = db.Column(db.String(200), nullable=True)

#     create a method to convert the attributes of the class to json
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "phoneNumber": self.phoneNumber,
            "address": self.address,
            "gender": self.gender,
            "contactImg_url": self.contactImg_url
        }
