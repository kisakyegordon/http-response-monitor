# HTTP Response Monitor

A full-stack monitoring application that periodically sends randomized JSON payloads to `httpbin.org/anything`, stores the responses in PostgreSQL, and displays updates in real time on a dashboard.

---

# Features

- Scheduled HTTP monitoring every 5 minutes
- Randomized JSON payload generation
- Historical response storage
- Real-time dashboard updates using Socket.IO
- REST API for response history
- PostgreSQL persistence
- Automated testing with Jest + Supertest
- GitHub Actions CI pipeline
- Responsive frontend dashboard

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

- Real-time latency charts
- Anomaly detection
- Alerting system
- Advanced filtering
- Authentication
- Time-series analytics

---

# Screenshots

Screenshots and deployment URLs will be added after deployment.