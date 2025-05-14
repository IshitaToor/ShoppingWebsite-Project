from flask import Blueprint, request, jsonify
from app.models import Cart, db

bp = Blueprint('cart', __name__, url_prefix='/api/cart')


@bp.route('/', methods=['POST'])
def add_to_cart():
    data = request.json
    cart_item = Cart(user_id=data['user_id'], product_id=data['product_id'], quantity=data['quantity'])
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({'message': 'Product added to cart'})


@bp.route('/', methods=['GET'])
def get_cart():
    user_id = request.args.get('user_id')
    cart_items = Cart.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': c.id,
        'product_id': c.product_id,
        'quantity': c.quantity
    } for c in cart_items])
