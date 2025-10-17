# Planar Server

Backend server for the Planar BOQ (Bill of Quantities) application.

## Features

- Express.js REST API
- PostgreSQL database with Sequelize ORM
- BOQ calculation and storage
- CORS enabled for frontend integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp env.example .env
```

Edit `.env` with your database credentials:
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

3. Make sure PostgreSQL is running and create the database:
```sql
CREATE DATABASE planar_db;
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### BOQ Routes (`/api/boq`)

- `POST /calculate` - Calculate BOQ and save record
- `GET /records` - Get all BOQ records
- `GET /records/:id` - Get specific BOQ record
- `DELETE /records/:id` - Delete BOQ record

### Health Check

- `GET /health` - Server health status

## Database Schema

The `boq_records` table stores:
- Project information (name, building type, location)
- Dimensions (length, width, perimeter)
- Calculated materials (cement, sand, gravel, water for blinding, foundation, columns)
- Labor costs
- Timestamps

## Environment Variables

- `DB_HOST` - Database host (default: localhost)
- `DB_PORT` - Database port (default: 5432)
- `DB_NAME` - Database name (default: planar_db)
- `DB_USER` - Database username (default: postgres)
- `DB_PASSWORD` - Database password
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:3000)
