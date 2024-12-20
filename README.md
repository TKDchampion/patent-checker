# Patent Checker

A min patent infringement check app

## Demo

https://patent-checker.vercel.app/

## Tech stack

- Node.js 22
- npm (comes with Node.js).
- Nextjs 15 (FE & BE)
- Postgres (DB)
- Jest (Unit test)
- Docker
- LLM (GROQ)
- zustand (store pattern)

## Getting Started

Follow these steps to set up and start the project.

### 1. Clone the repository

```bash
git clone https://github.com/TKDchampion/patent-checker.git
cd patent-checker
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Create Environment Variables

```bash
# .env file
GROQ_API_KEY=XXX
POSTGRES_DATABASE=XXX
POSTGRES_HOST=XX
POSTGRES_PASSWORD=XX
POSTGRES_PRISMA_URL=XXX
sslmode=XXX
POSTGRES_URL=XXX
POSTGRES_URL_NON_POOLING=XXX
POSTGRES_URL_NO_SSL=XXX
POSTGRES_USER=XX
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Unit Test(option)

```bash
npm test
```

### 6. Build and Start for Production

```bash
npm run build
npm start
```

### 7. Deploy Product on docker

```bash
# Build the Containers
docker-compose build
# Run the Containers
docker-compose up
```

## Folder Structure

- /pages - Contains all the Next.js pages
- /components - Reusable UI components
- /public - Static assets like images, fonts, etc.
- /api - Backend API routes if using Next.js API routes
- /api/[pathName]/helper - Reusable utility functions that perform common tasks
- /api/[pathName]/lib - Contains core logic or API modules for the api.
- /[pathName].test.ts - Unit test in Jest
- /utils - Contains common logic or API modules for use across the project
- /types - Contains common model types
- /stores - control states

## Deploy

- CICD
- Vercel
- GitHub
