# API Learning App

A tiny full-stack task tracker to understand how APIs work in real apps.

## What this app demonstrates

- Backend API built with Express
- Frontend calling API endpoints with `fetch()`
- Full CRUD API flow (`GET`, `POST`, `PATCH`, `DELETE`)
- JSON requests and responses
- Simple filtering with query params

## Endpoints

- `GET /api/health` - health check
- `GET /api/tasks` - list tasks
- `GET /api/tasks?status=open` - only open tasks
- `GET /api/tasks?status=done` - only completed tasks
- `POST /api/tasks` - create task
- `PATCH /api/tasks/:id` - mark task done/open
- `DELETE /api/tasks/:id` - delete task

## Run it locally

```bash
cd /Users/coder/SRC/api-learning-app
npm install
npm start
```

Then open:

- http://localhost:3000

## Sample request bodies

Create task:

```json
{ "title": "Buy groceries" }
```

Update task status:

```json
{ "done": true }
```

## How request flow works

1. You click a button in the browser.
2. Frontend code sends an HTTP request with `fetch()`.
3. Express route receives request and runs backend logic.
4. Backend sends JSON response.
5. Frontend receives JSON and renders it on the page.

Note: tasks are stored in memory for learning purposes, so data resets when server restarts.
