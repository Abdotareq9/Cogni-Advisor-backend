# Cogni-Advisor Backend - Deployment Guide

## Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `PORT` - Server port (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing (change in production)

## Local Development

```bash
npm install
npx prisma migrate dev  # Apply migrations
npm run dev
```

## Docker

### Build and run with Docker Compose

```bash
docker-compose up --build
```

This starts:
- PostgreSQL on port 5432
- API server on port 5000

### Build image only

```bash
docker build -t cogni-advisor-backend .
docker run -p 5000:5000 -e DATABASE_URL=postgresql://... -e JWT_SECRET=... cogni-advisor-backend
```

### Database migrations

When using Docker Compose, run migrations manually on first deploy:

```bash
docker-compose exec app npx prisma migrate deploy
```

Or with a standalone container:

```bash
docker run --rm -e DATABASE_URL=... cogni-advisor-backend npx prisma migrate deploy
```

## API Documentation

- Swagger UI: `http://localhost:5000/api-docs`
- Health check: `GET /health`
