# Engineering Decisions & Tradeoffs

# PostgreSQL

## Why PostgreSQL?

PostgreSQL was selected because:
- the data is structured and queryable
- JSONB support allows flexible payload storage
- strong ecosystem and free hosting options

## Tradeoff

A dedicated time-series database could perform better at very large scale.

---

# Socket.IO

## Why Socket.IO?

Socket.IO provides:
- simple real-time communication
- automatic reconnection handling
- browser compatibility

## Tradeoff

For one-way event streaming, Server-Sent Events could be simpler.

---

# node-cron

## Why node-cron?

`node-cron` was selected because:
- lightweight setup
- sufficient for periodic monitoring
- easy local development experience

## Tradeoff

A production-scale monitoring system may use:
- distributed workers
- message queues
- managed schedulers

---

# REST + Socket.IO Combination

## Why both?

REST APIs:
- fetch historical records

Socket.IO:
- handles real-time updates

This separation keeps responsibilities simple and predictable.

---

# Database Initialization on Startup

## Why?

Automatically initializing schema improves local setup experience and reduces onboarding friction.

## Tradeoff

Production systems may prefer managed migrations with tools such as:
- Prisma Migrate
- Knex Migrations
- Flyway

---

# Current Architecture Scope

The architecture intentionally prioritizes:
- simplicity
- readability
- maintainability
- pragmatic engineering

over premature optimization.

The current scale requirements do not justify introducing:
- Kafka
- Redis
- Kubernetes
- distributed schedulers

at this stage.