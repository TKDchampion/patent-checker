# Patent Checker

A min patent infringement check app

## Tech stack

- Node.js 22
- npm (comes with Node.js).
- Nextjs 15 (FE & BE)
- SQlite (DB)
- Jest (Unit test)
- Docker

## Getting Started

Follow these steps to set up and start the project.

### 1. Clone the repository

```bash
git clone https://github.com/TKDchampion/patent-checker.git
cd patent-checker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create Environment Variables

```bash
# .env file
GROQ_API_KEY=https://api.example.com
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
- /styles - Global and component-specific styles
- /api - Backend API routes if using Next.js API routes
- /api/[pathName]/helper - Reusable utility functions that perform common tasks
- /api/[pathName]/lib - Contains core logic or API modules for the api.
- /[pathName].test.ts - Unit test in Jest
- /db - database
- /lib - Contains core logic or API modules for use across the project
- /utils - Contains common functions for use across the project
