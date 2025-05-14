from flask import Blueprint, jsonify
from app.models import Collection

bp = Blueprint('collection_routes', __name__, url_prefix='/api/collections')


@bp.route('/all', methods=['GET'])
def get_collections():
    collections = Collection.query.all()
    return jsonify([{
        "id": collection.id,
        "name": collection.name,
        "description": collection.description,
        "image": collection.image,
    } for collection in collections])


@bp.route('/<int:collection_id>', methods=['GET'])
def get_collection_by_id(collection_id):
    collection = Collection.query.get(collection_id)
    if not collection:
        return jsonify({"error": "Collection not found"}), 404

    return jsonify({
        "id": collection.id,
        "name": collection.name,
        "description": collection.description,
        "image": collection.image,
    })
