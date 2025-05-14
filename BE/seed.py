from app import create_app, db
from app.models import Product, Collection

app = create_app()

collections = [
    {"id": 1, "name": "Summer Collection", "description": "Light and breezy pieces for warm weather days.", "image": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"},
    {"id": 2, "name": "Autumn Essentials", "description": "Cozy styles for the transitional season.", "image": "https://images.unsplash.com/photo-1511401139252-f158d3209c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"},
    {"id": 3, "name": "Workwear Edit", "description": "Professional and stylish workwear.", "image": "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80"}
]

products = [
    {"id": 1, "name": "White T-Shirt", "price": 450, "category": "Tops", "image": "images/white-tshirt.webp", "description": "A classic white t-shirt made from 100% cotton.", "is_featured": True, "collection_id": 1},
    {"id": 2, "name": "Denim Jeans", "price": 700, "category": "Bottoms", "image": "images/denim-jeans.webp", "description": "Stylish and durable denim jeans for everyday wear.", "is_featured": True, "collection_id": 1},
    {"id": 3, "name": "Formal Blazer", "price": 1400, "category": "Formal", "image": "images/formal-blazer.webp", "description": "A sleek formal blazer perfect for office or events.", "is_featured": False, "collection_id": 3},
    {"id": 4, "name": "Running Shoes", "price": 800, "category": "Shoes", "image": "images/running-shoes.webp", "description": "Comfortable running shoes for all your fitness needs.", "is_featured": True, "collection_id": 2},
    {"id": 5, "name": "Sunglasses", "price": 500, "category": "Accessories", "image": "images/sunglasses.webp", "description": "Stylish sunglasses to protect your eyes from the sun.", "is_featured": False, "collection_id": 2},
    {"id": 6, "name": "Oversized Hoodie", "price": 550, "category": "Hoodies", "image": "images/over-sized.webp", "description": "A cozy oversized hoodie for casual outings.", "is_featured": True, "collection_id": 1},
    {"id": 7, "name": "Faux Leather Skirt", "price": 700, "category": "Outwear", "image": "images/faux-leather.jpg", "description": "A chic faux leather skirt for a bold fashion statement.", "is_featured": False, "collection_id": 3},
]

with app.app_context():
    db.session.query(Product).delete()
    db.session.query(Collection).delete()

    for collection in collections:
        db.session.add(Collection(**collection))

    for product in products:
        db.session.add(Product(**product))

    db.session.commit()
    print("Database seeded successfully!")