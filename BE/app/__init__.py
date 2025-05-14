from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('app.config.Config')

    db.init_app(app)
    migrate.init_app(app, db)
    
    
    from app.routes import product_routes, collection_routes, cart_routes, order_routes, newsletter_routes, messages_routes
    app.register_blueprint(product_routes.bp)
    app.register_blueprint(collection_routes.bp)
    app.register_blueprint(cart_routes.bp)
    app.register_blueprint(order_routes.bp)
    app.register_blueprint(newsletter_routes.bp)
    app.register_blueprint(messages_routes.bp)

    return app
