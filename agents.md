# AI Agents Guidance File

## AI Tools Used
- Claude (Anthropic) — primary coding assistant
- VS Code with Pylance — code intelligence and error detection

## Agent Workflow

### Phase 1 — Backend Setup
Prompted Claude to generate Flask backend with SQLAlchemy. Reviewed every file before using it. When circular import error appeared, debugged with Claude's help and understood the fix before applying it.

### Phase 2 — Frontend Setup
Used Claude to generate React components. Each component was reviewed and understood before integrating. Modified prop names and structure to match our specific backend API.

### Phase 3 — Debugging
Used Claude to diagnose errors by sharing error messages. Claude explained root causes, not just fixes. This ensured understanding of every issue.

## Coding Standards Enforced
- All API responses return consistent JSON format
- Error handling on every API endpoint
- Frontend shows loading states and error messages
- Component responsibilities are clearly separated

## What AI Cannot Replace
- Architectural judgment calls
- Understanding trade-offs between technical choices
- Ability to explain and defend decisions in a walkthrough
- Debugging by reading and understanding code flow