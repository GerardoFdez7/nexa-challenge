#!/bin/bash

# Exit on any error
set -e

echo "Starting database migration and seeding process..."

# Run database migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Run database seeding
echo "Running database seeding..."
npx prisma db seed

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

echo "Database setup completed successfully!"

# Start the application
echo "Starting the application..."
exec npm start