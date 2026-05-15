# HTTP Response Monitor

A full-stack monitoring application that periodically sends randomized JSON payloads to `httpbin.org/anything`, stores the responses in PostgreSQL, and displays updates in real time on a dashboard.

---

# Features

## Core Features

- Scheduled HTTP monitoring every 5 minutes
- Real-time dashboard updates
- Historical response storage
- REST API endpoints for response history
- Live Socket.IO streaming
- Responsive frontend dashboard

## Monitoring & Analytics Features

- Real-time HTTP response monitoring
- Historical response tracking
- Rolling response-time averages
- Threshold-based anomaly detection
- Live websocket metric streaming
- Time-series visualization dashboards

## Engineering Features

- CI pipeline with GitHub Actions
- Automated testing
- Environment-based configuration
- Production deployment on Render + Vercel

---

# Tech Stack

## Backend

- Node.js
- Express
- PostgreSQL
- Socket.IO
- node-cron

## Frontend

- React
- Vite
- Axios
- Socket.IO Client

## Testing & CI

- Jest
- Supertest
- GitHub Actions

## Deployment

- Render
- Vercel
- Supabase / Neon PostgreSQL

---

# Local Development

# Database Setup

## Prerequisites

Ensure PostgreSQL is installed locally.

Recommended version:

- PostgreSQL 14+

---

## Create Database

Open psql or your preferred PostgreSQL client.

```sql
CREATE DATABASE http_response_monitor;
```

---

## Environment Variables

Create a `.env` file in the backend directory.

Example:

```env
PORT=5000

DATABASE_URL=postgresql://postgres:password@localhost:5432/http_response_monitor

CLIENT_URL=http://localhost:5173

HTTPBIN_URL=https://httpbin.org/post

MONITOR_INTERVAL=*/5 * * * *
```

---


## Run Database Migrations

```bash
npm run migrate
```

---


## Database Schema

### responses

| Column | Type | Description |
|---|---|---|
| id | UUID | Primary key |
| status_code | INTEGER | HTTP status code |
| response_time_ms | INTEGER | Request duration |
| payload | JSONB | Request payload |
| anomaly | BOOLEAN | Whether anomaly detected |
| created_at | TIMESTAMP | Record timestamp |

---

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```text
http://localhost:4000
```

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Running Tests

## Backend tests

```bash
cd backend
npm test
```

## Coverage report

```bash
npm run test:coverage
```

---

# Documentation

- [Architecture](docs/architecture.md)
- [Deployment](docs/deployment.md)
- [Testing Strategy](docs/testing.md)
- [Tradeoffs & Decisions](docs/tradeoffs.md)

---

# Environment Variables

Environment variable examples are included in:

- `backend/.env.example`
- `frontend/.env.example`

---

# Future Improvements

- Alerting system
- Authentication
- Time-series analytics

---

## Assumptions

- HTTPBin availability is assumed to be stable
- Monitoring interval fixed at 5 minutes
- Anomaly detection focused on response times only
- Real-time updates optimized for low-to-medium traffic

---

# Deployments

[Live Demo](https://http-response-monitor.vercel.app)

# Screenshots

![Main Page](./docs/assets/main_page.png)

![Response Table](./docs/assets/table.png)
