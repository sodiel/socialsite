# SocialSite — Full-Stack Publishing Platform

An end-to-end social publishing app focused on production-minded fundamentals: role-based access, secure authentication, clear API boundaries, and a modern UI.

SocialSite goes beyond a basic CRUD demo by modeling realistic product behavior (publish vs draft, personal content views, media attachments) with maintainable architecture and scalable domain design.

## Table of Contents

- [Why this project matters](#why-this-project-matters)
- [Key capabilities](#key-capabilities)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Data model highlights](#data-model-highlights)
- [API overview](#api-overview)
- [Quick start](#quick-start)
- [Project structure](#project-structure)
- [Roadmap](#roadmap)
- [Author](#author)
- [License](#license)

## Why this project matters

This project showcases end-to-end product delivery across the full development lifecycle:

- Design and implement backend modules with NestJS + Prisma.
- Build responsive frontend experiences with React + TypeScript.
- Apply role-based authorization (AUTHOR / READER) to business flows.
- Integrate relational data modeling and migration workflows in PostgreSQL.
- Deliver maintainable code organization for future feature expansion.

## Key capabilities

- JWT-based auth flow: registration, login, protected routes.
- Role-aware behavior:
  - `AUTHOR`: create posts, publish immediately or save drafts.
  - `READER`: consume published content.
- Feed filters for authors: all posts, my posts, my drafts.
- Image upload and attachment to posts.
- Server-side validation and error handling.
- Idempotency key support when creating posts.

## Tech stack

### Backend

- NestJS (TypeScript)
- Prisma ORM
- PostgreSQL (Docker)
- JWT + Passport
- class-validator / ValidationPipe

### Frontend

- React 18 + TypeScript
- Vite
- React Router
- React Hook Form + Zod
- Tailwind CSS + Radix UI components

## Architecture

`frontend` (React SPA) communicates with `backend` (NestJS REST API).

- Frontend handles routing, forms, local UI state, and auth token storage.
- Backend handles auth, authorization, post workflows, and persistence.
- Prisma maps domain entities to PostgreSQL with migration history.
- Uploaded media is served statically from the backend under `/uploads`.

## Data model highlights

- `User`
  - Unique email
  - Hashed password
  - Role: `AUTHOR` or `READER`
- `Post`
  - Author relation
  - Status: `DRAFT` or `PUBLISHED`
  - `idempotencyKey` for safer create operations
  - Engagement counters (`like`, `comments`)
- `Image`
  - One-to-one relation with post
  - Stored image URL with timestamp

## API overview

Base URL: `http://localhost:3000`

### Auth

- `POST /auth/register` — register user
- `POST /auth/login` — receive JWT token

### Posts (JWT protected)

- `GET /post` — published posts
- `GET /post/my-posts` — current author posts
- `GET /post/my-drafts` — current author drafts
- `POST /post` — create draft/published post
- `POST /post/upload` — upload and attach image
- `PATCH /post/:id` — update post
- `DELETE /post/:id` — delete post

## Quick start

### 1) Prerequisites

- Node.js 20 or 22 (LTS)
- `pnpm`
- Docker + Docker Compose

### 2) Start PostgreSQL

```bash
cd backend
docker compose up -d
```

### 3) Configure backend environment

Create `backend/.env`:

```env
DATABASE_URL="postgresql://admin:password@localhost:5464/dev?schema=public"
JWT_SECRET="replace-with-your-secret"
PORT=3000
```

### 4) Install dependencies

```bash
cd backend
pnpm install
pnpm prisma generate
pnpm prisma migrate dev

cd ../frontend
pnpm install
```

### 5) Run the app

Terminal 1:

```bash
cd backend
pnpm start:dev
```

Terminal 2:

```bash
cd frontend
pnpm dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:3000`

## Project structure

```text
fullstack/
├── backend/     # NestJS API, Prisma schema, migrations, auth & posts modules
├── frontend/    # React SPA, pages, UI components, feed/auth flows
└── README.md
```

## Roadmap

- Add refresh token flow and logout invalidation.
- Add ownership checks for update/delete post endpoints.
- Move media storage from local disk to cloud object storage.
- Add e2e tests for critical auth and posting flows.
- Add CI pipeline for lint/test/build.

## Author

Built by [@sodiel](https://www.github.com/sodiel).

## License

MIT
