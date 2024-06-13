from app import db


# create a class Contact that inherits from db.Model
class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    phoneNumber = db.Column(db.Integer, nullable=False, unique=True)
    address = db.Column(db.String(100), nullable=False, unique=True)
    contactImg_url = db.Column(db.String(200), nullable=True, unique=True)

#     create a method to convert the attributes of the class to json
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "phoneNumber": self.phoneNumber,
            "address": self.address,
            "imgUrl": self.contactImg_url
        }
