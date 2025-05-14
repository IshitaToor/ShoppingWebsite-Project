from flask import Blueprint, request, jsonify
from app.models import Order, db
from datetime import datetime, timedelta

bp = Blueprint('orders', __name__, url_prefix='/api/orders')

@bp.route('/place', methods=['POST'])
def create_order():
    data = request.get_json()

    # Extract order details
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    email = data.get('email')
    address = data.get('address')
    city = data.get('city')
    state = data.get('state')
    zip_code = data.get('zipCode')
    country = data.get('country')
    card_number = data.get('cardNumber')
    card_expiry = data.get('expiryDate')
    card_name = data.get('cardName')
    cart = data.get('cart')
    total_price = data.get('totalAmount')

    if not first_name or not email or not cart:
        return jsonify({"error": "Missing required fields"}), 400

    # Simulate saving the order to the database
    try:
        delivery_date = datetime.utcnow() + timedelta(days=5)
        formatted_delivery_date = delivery_date.strftime("%B %d, %Y")  # Format as "May 21, 2025"

        new_order = Order(
            first_name=first_name,
            last_name=last_name,
            email=email,
            address=address,
            city=city,
            state=state,
            zip_code=zip_code,
            country=country,
            payment_status="Paid" if card_number and card_expiry and card_name else "Unpaid",
            cart_items=str(cart),
            total_price=total_price,
            date_created=datetime.utcnow(),
            del_date=delivery_date,
        )
        db.session.add(new_order)
        db.session.commit()

        return jsonify({"message": "Order placed successfully", "orderId": new_order.order_id, "deliveryDate": formatted_delivery_date}), 201
    except Exception as e:
        print(f"Error creating order: {e}")
        return jsonify({"error": "Failed to place order"}), 500
