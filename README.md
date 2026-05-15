# HTTP Response Monitor

A full-stack monitoring application that periodically sends randomized JSON payloads to `httpbin.org/anything`, stores the responses, and displays them in real time on a dashboard.

## Project Status

Initial project setup in progress.

## Planned Architecture

- Backend: Node.js + Express
- Frontend: React + Vite
- Database: PostgreSQL
- Real-time updates: Socket.IO
- Scheduler: node-cron
- CI/CD: GitHub Actions
- Deployment: Render + Vercel + Supabase/Neon

## Folder Structure

```
backend/   API server, scheduler, database access, Socket.IO
frontend/  React dashboard
docs/      Architecture notes and diagrams
.github/   CI pipeline
```