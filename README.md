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

## AI/Monitoring Features

- Rolling averages
- Z-score anomaly detection
- Response time forecasting
- Confidence band visualization

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
- Single monitored endpoint for MVP scope
- Anomaly detection focused on response times only
- Real-time updates optimized for low-to-medium traffic

---

# Deployments

[Live Demo](https://http-response-monitor.vercel.app)

# Screenshots

![Main Page](./assets/main_page.png)

![Response Table](./assets/table.png)
