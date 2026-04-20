# API Learning App

A tiny full-stack app to understand how an API works.

## What this app demonstrates

- Backend API built with Express
- Frontend calling API endpoints with `fetch()`
- Difference between `GET` and `POST`
- JSON requests and responses

## Endpoints

- `GET /api/hello` - basic JSON response
- `GET /api/tip` - random API tip
- `POST /api/echo` - sends text and gets transformed data back

## Run it locally

```bash
cd /Users/coder/SRC/api-learning-app
npm install
npm start
```

Then open:

- http://localhost:3000

## How request flow works

1. You click a button in the browser.
2. Frontend code sends an HTTP request with `fetch()`.
3. Express route receives request and runs backend logic.
4. Backend sends JSON response.
5. Frontend receives JSON and renders it on the page.
