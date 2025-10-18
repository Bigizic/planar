# Planar BOQ Application

A Bill of Quantities (BOQ) calculation application with separate frontend and backend services.

## Architecture

- **Frontend**: Next.js React application
- **Backend**: Express.js server with PostgreSQL and Sequelize ORM
- **Database**: PostgreSQL

## Project Structure

```
planar/
├── frontend/          # Next.js frontend application
├── server/           # Express.js backend server
└── README.md
```

## Quick Start

### 1. Database Setup

First, make sure PostgreSQL is installed and running. Create a database:

```sql
CREATE DATABASE planar_db;
```

### 2. Backend Setup

```bash
cd server
cp env.example .env
# Edit .env with your database credentials
npm install
npm run dev
```

The server will start on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend
cp env.local.example .env.local
# Edit .env.local with your API URL (default: http://localhost:3001)
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=planar_db
DB_USER=your_username
DB_PASSWORD=your_password
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## API Endpoints

### BOQ Routes (`/api/boq`)

- `POST /calculate` - Calculate BOQ and save record
- `GET /records` - Get all BOQ records  
- `GET /records/:id` - Get specific BOQ record
- `DELETE /records/:id` - Delete BOQ record

### Health Check

- `GET /health` - Server health status

## Features

- BOQ calculation for construction projects
- Material quantity calculations (cement, sand, gravel, water)
- Labor cost estimation based on location
- Data persistence with PostgreSQL
- RESTful API architecture
- CORS enabled for frontend integration

## Development

### Backend Development
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js development server
```

## Production Deployment

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Database Schema

The `boq_records` table stores:
- Project information (name, building type, location)
- Dimensions (length, width, perimeter)
- Calculated materials for blinding, foundation, and columns
- Labor costs
- Timestamps

## Migration from Supabase

This project has been migrated from Supabase to a self-hosted PostgreSQL database with Express.js backend. The frontend now communicates with the backend API instead of directly with Supabase.
