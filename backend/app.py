# Test PR for AI review
from flask import Flask
from models import db
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'mysecretkey123'
    
    # Initialize extensions
    CORS(app)
    db.init_app(app)
    
    # Register routes
    from routes.tasks import tasks_bp
    app.register_blueprint(tasks_bp, url_prefix='/api')
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)