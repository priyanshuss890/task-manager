# Claude AI Guidance File

## How Claude Was Used in This Project

### Code Generation
Claude was used to generate the initial Flask backend structure including app.py, models.py, and route files. Claude suggested the Application Factory pattern for Flask which is a best practice for scalable Flask apps.

### Debugging
When a circular import error occurred between models.py and app.py, Claude diagnosed the issue and suggested moving the SQLAlchemy db instance into models.py to break the circular dependency.

### Architecture Decisions
Claude recommended SQLite over PostgreSQL for this assessment because it requires zero infrastructure setup while still being a fully relational database. Claude explained the trade-offs clearly.

### Constraints Given to Claude
- Keep the codebase simple and readable
- Use Flask best practices like blueprints and application factory
- Prioritize clean architecture over feature count
- Every decision should be explainable

### What Was NOT delegated to Claude
- Understanding of the overall architecture
- Decision on what product to build
- Walkthrough explanation and reasoning
- Technical decision justifications

## Prompting Approach
Prompts were kept specific and goal oriented. For example instead of "build a task manager" the prompt was "build a Flask REST API for tasks using SQLAlchemy with blueprint structure and application factory pattern." Specific constraints produced better results.