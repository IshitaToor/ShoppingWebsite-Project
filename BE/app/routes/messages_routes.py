from flask import Blueprint, request, jsonify
from app.models import Message, db
from datetime import datetime

bp = Blueprint('message', __name__, url_prefix='/api/contactus')


@bp.route('/message', methods=['POST'])
def subscribe_newsletter():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject")
    message = data.get("message")

    if not all([name, email, subject, message]):
        return jsonify({"error": "All fields (name, email, subject, message) are required"}), 400

    # Create a new message entry
    new_message = Message(name=name, email=email, subject=subject, message=message)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({"message": "Message saved successfully"}), 201

