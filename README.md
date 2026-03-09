# Task Manager — Better Software Assessment

A full stack task management application built with Python/Flask, React, and SQLite.

## Live URLs
- Frontend: (add after deployment)
- Backend: (add after deployment)

## Tech Stack
- **Backend:** Python, Flask, Flask-SQLAlchemy, Flask-CORS
- **Frontend:** React.js
- **Database:** SQLite (via SQLAlchemy ORM)

## Architecture Decisions

### Why SQLite?
SQLite requires zero configuration and is a fully relational database supporting SQL queries. For this assessment it demonstrates relational database usage without infrastructure overhead. Switching to PostgreSQL requires changing one line in config.

### Why Flask Application Factory Pattern?
The `create_app()` function pattern makes the app modular and testable. It avoids circular imports and allows easy configuration for different environments.

### Why Blueprint for Routes?
Separating routes into Blueprints keeps the codebase organized as it scales. Adding new feature modules like users or comments becomes clean and isolated.

### Why SQLAlchemy ORM?
Writing raw SQL is error prone and hard to maintain. SQLAlchemy lets you work with Python objects while it handles SQL generation, preventing SQL injection by default.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (supports ?status= filter) |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task title, description or status |
| DELETE | /api/tasks/:id | Delete task |

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## How to Extend
- Add user authentication using Flask-JWT-Extended
- Add task priorities and due dates
- Switch to PostgreSQL by changing SQLALCHEMY_DATABASE_URI
- Add task categories or labels
- Add pagination for large task lists

## Risks
- SQLite is not suitable for concurrent writes in production
- No authentication means anyone can access all tasks
- No rate limiting on API endpoints