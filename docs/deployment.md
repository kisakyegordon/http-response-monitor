# Deployment Guide

# Planned Deployment Stack

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Supabase / Neon PostgreSQL |
| CI Pipeline | GitHub Actions |

---

# Backend Deployment (Render)

## Build Command

```bash
npm install
```

## Start Command

```bash
npm start
```

## Environment Variables

```env
PORT=4000
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.vercel.app
HTTPBIN_URL=https://httpbin.org/anything
PING_INTERVAL=*/5 * * * *
DATABASE_URL=your-postgres-url
```

---

# Frontend Deployment (Vercel)

## Build Command

```bash
npm run build
```

## Environment Variables

```env
VITE_API_URL=https://http-response-monitor.onrender.com
VITE_SOCKET_URL=https://http-response-monitor.onrender.com
```

---

# Database Setup

## Supabase / Neon

1. Create a PostgreSQL project.
2. Copy the connection string.
3. Add it to Render as `DATABASE_URL`.
4. Backend initializes schema automatically.

---

# Notes

- Render free services may sleep when inactive.
- The first backend request after inactivity may be slow.
- Environment variables should never be committed.