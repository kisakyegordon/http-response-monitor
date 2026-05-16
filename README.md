# HTTP Response Monitor

A full-stack monitoring application that periodically sends randomized JSON payloads to `httpbin.org/anything`, stores the responses in PostgreSQL, and displays updates in real time through a live dashboard.

The application includes:

- Real-time monitoring
- Historical response tracking
- Anomaly detection
- Forecasting & rolling averages
- CI pipeline with automated testing
- Production deployment

---

# Live Demo

Frontend:

https://http-response-monitor.vercel.app

---

# Screenshots

## Dashboard

![Dashboard](./docs/assets/main_page.png)

## Historical Response Table

![Response Table](./docs/assets/table.png)

---

# Architecture Overview

The system consists of:

- React frontend dashboard
- Express backend API
- PostgreSQL database
- Scheduled monitoring service
- Socket.IO real-time communication

## High-Level Flow

![Architecture](./docs/assets/arch.png)

Detailed architecture:

[Architecture Documentation](./docs/architecture.md)

---

# Features

## Core Features

- Scheduled HTTP monitoring every 5 minutes
- Random JSON payload generation
- Historical response storage
- REST API endpoints
- Real-time dashboard updates using Socket.IO
- Responsive frontend dashboard

## Monitoring & Analytics

- Rolling response-time averages
- Z-score anomaly detection
- Response-time forecasting
- Confidence band visualization
- Real-time anomaly indicators
- Historical monitoring trends

## Engineering Features

- CI pipeline with GitHub Actions
- Automated testing
- ESLint integration
- Environment-based configuration
- Production deployment with Render + Vercel

---

# Technology Decisions

## Backend — Express.js

Express was chosen because it is lightweight, flexible, and works well for REST APIs and Socket.IO real-time communication.

## PostgreSQL

PostgreSQL was selected because monitoring data is structured and relational querying works well for analytics and historical tracking.

## Socket.IO

Socket.IO enables efficient real-time updates without requiring frontend polling.

## React + Vite

React provides a clean component architecture while Vite enables fast local development and optimized production builds.

---

# Project Structure

```text
backend/
  src/
  tests/

frontend/
  src/
  components/

docs/
.github/
```

---

# Quick Start

## 1. Clone Repository

```bash
git clone https://github.com/kisakyegordon/http-response-monitor
cd http-response-monitor
```

---

# Local Development Setup

## Prerequisites

Install:

- Node.js 20+
- PostgreSQL 14+

---

## 1. Create Database

Open PostgreSQL:

```sql
CREATE DATABASE http_response_monitor;
```

---

## 2. Configure Backend

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Example `.env`:

```env
PORT=4000

DATABASE_URL=postgresql://postgres:password@localhost:5432/http_response_monitor

CLIENT_URL=http://localhost:5173

HTTPBIN_URL=https://httpbin.org/anything

MONITOR_INTERVAL=*/5 * * * *
```

Run migrations:

```bash
npm run migrate
```

Start backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:4000
```

---

## 3. Configure Frontend

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Example `.env`:

```env
VITE_API_URL=http://localhost:4000
VITE_SOCKET_URL=http://localhost:4000
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# Database Schema

## responses

| Column             | Type      | Description                 |
| ------------------ | --------- | --------------------------- |
| id                 | UUID      | Primary key                 |
| status_code        | INTEGER   | HTTP status code            |
| response_time_ms   | INTEGER   | Request duration            |
| payload            | JSONB     | Response payload            |
| anomaly            | BOOLEAN   | Whether anomaly detected    |
| rolling_average    | FLOAT     | Rolling response average    |
| forecast_value     | FLOAT     | Predicted response time     |
| created_at         | TIMESTAMP | Response creation timestamp |

---

# API Endpoints

## GET /api/responses

Returns historical monitoring data.

## GET /api/metrics

Returns rolling averages, anomaly metrics, and forecast data.

---

# Real-Time Features

The backend broadcasts newly collected monitoring data using Socket.IO.

The frontend listens for:

- new monitoring responses
- anomaly updates
- rolling average updates
- forecast changes

This avoids polling and provides live dashboard updates.

---

# Anomaly Detection

The application includes a lightweight anomaly detection system.

Features:

- 24-hour rolling statistics window
- Rolling mean calculation
- Standard deviation calculation
- Z-score anomaly detection
- Forecast generation
- Confidence bands

Anomalies are identified when:

- response times significantly exceed the rolling average
- z-score thresholds are exceeded

Detailed implementation:

[Anomaly Detection Documentation](./docs/anomaly-detection.md)

---

# Testing Strategy

Core functionality selected for testing:

- HTTP monitoring service
- Anomaly detection logic
- REST API endpoints

These components were prioritized because they contain the primary business logic and data-processing behavior of the system.

## Test Categories

### Unit Tests

- Monitoring service logic
- Anomaly calculations
- Forecast calculations

### Integration Tests

- API endpoints
- Database interaction
- Socket.IO event flow

### Frontend Tests

- Dashboard rendering
- Table rendering
- Real-time update behavior

---

# Running Tests

## Backend Tests

```bash
cd backend
npm test
```

## Coverage Report

```bash
npm run test:coverage
```

## Frontend Linting

```bash
cd frontend
npm run lint
```

---

# CI Pipeline

GitHub Actions pipeline includes:

- Dependency installation
- ESLint checks
- Backend tests
- Coverage generation
- Frontend build validation

Workflow file:

```text
.github/workflows/ci.yml
```

---

# Deployment

## Frontend

Deployed on:

- Vercel

## Backend

Deployed on:

- Render

## Database

Hosted on:

- Supabase PostgreSQL

Detailed deployment steps:

[Deployment Documentation](./docs/deployment.md)

---

# Tradeoffs & Assumptions

## Tradeoffs

- PostgreSQL was used instead of a dedicated time-series database to reduce infrastructure complexity.
- Forecasting uses lightweight rolling averages instead of machine-learning models to keep calculations efficient.
- Socket.IO broadcasting is in-memory and not horizontally scaled with Redis Pub/Sub.

## Assumptions

- `httpbin.org` availability is assumed to be stable.
- Monitoring interval remains fixed at 5 minutes.
- Anomaly detection focuses primarily on response times.
- The system is optimized for low-to-medium traffic volumes.

---

# Future Improvements

- Redis-backed websocket scaling
- Slack/email alert integrations
- User-configurable monitoring intervals
- Multi-endpoint monitoring
- Advanced forecasting models
- Persistent anomaly alert history
- Authentication & user management

---

# Additional Documentation

- [Architecture](./docs/architecture.md)
- [Deployment](./docs/deployment.md)
- [Testing Strategy](./docs/testing.md)
- [Tradeoffs & Decisions](./docs/tradeoffs.md)
- [Anomaly Detection](./docs/anomaly-detection.md)

---

# Assignment Coverage

This project implements:

- scheduled monitoring
- real-time updates
- historical response storage
- REST APIs
- CI/CD pipeline
- anomaly detection
- forecasting
- deployment documentation
- testing strategy

As described in the take-home requirements.