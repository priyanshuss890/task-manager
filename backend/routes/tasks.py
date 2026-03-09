from flask import Blueprint, request, jsonify
from models import Task
from app import db

tasks_bp = Blueprint('tasks', __name__)

# Get all tasks
@tasks_bp.route('/tasks', methods=['GET'])
def get_tasks():
    status = request.args.get('status')
    if status:
        tasks = Task.query.filter_by(status=status).all()
    else:
        tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks])

# Create task
@tasks_bp.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    if not data or not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400
    
    task = Task(
        title=data['title'],
        description=data.get('description', ''),
        status='pending'
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

# Update task status
@tasks_bp.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.get_json()
    
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'status' in data:
        if data['status'] not in ['pending', 'in_progress', 'completed']:
            return jsonify({'error': 'Invalid status'}), 400
        task.status = data['status']
    
    db.session.commit()
    return jsonify(task.to_dict())

# Delete task
@tasks_bp.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})