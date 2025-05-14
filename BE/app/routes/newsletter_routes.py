from flask import Blueprint, request, jsonify
from app.models import Newsletter, db
from datetime import datetime

bp = Blueprint('newsletter', __name__, url_prefix='/api/newsletter')


@bp.route('/subscribe', methods=['POST'])
def subscribe_newsletter():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Check if the email already exists
    existing_entry = Newsletter.query.filter_by(email=email).first()
    if existing_entry:
        # Update the date_subscribed field
        existing_entry.date_subscribed = datetime.utcnow()
        db.session.commit()
        return jsonify({"message": "Subscription updated"}), 200

    # Add a new entry
    new_entry = Newsletter(email=email)
    db.session.add(new_entry)
    db.session.commit()
    return jsonify({"message": "Subscription successful"}), 201

