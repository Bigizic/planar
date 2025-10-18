#!/bin/bash

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from example..."
    cp env.example .env
    echo "Please edit .env file with your database credentials before running the server."
    exit 1
fi

# Start the server
echo "Starting server..."
npm run dev
