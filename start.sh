#!/bin/bash

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Create .env file for backend
cd ../backend
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
DB_DATABASE=notes_app
CORS_ORIGINS=http://localhost:5173
EOF

# Kill any processes using ports 3000 and 5173
lsof -ti:3000 | xargs -r kill -9 2>/dev/null || true
lsof -ti:5173 | xargs -r kill -9 2>/dev/null || true

# Stop and remove existing container if exists
docker stop postgres-notes > /dev/null 2>&1 || true
docker rm postgres-notes > /dev/null 2>&1 || true

# Run PostgreSQL container
docker run --name postgres-notes \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=1234 \
    -e POSTGRES_DB=notes_app \
    -p 5432:5432 \
    -d postgres:17.6

# Wait for Postgres to be ready
sleep 5

# Start servers
cd ../backend && npm run start:dev &
cd ../frontend && npm run dev & 

wait