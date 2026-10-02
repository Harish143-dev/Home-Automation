#!/bin/bash
set -e

echo "=========================================================="
echo "🚀 Deploying SmartHome OS on Hostinger Ubuntu VPS..."
echo "=========================================================="

# Check if .env file exists
if [ ! -f .env ]; then
  echo "❌ Error: .env file not found. Copy .env.example to .env and configure it first."
  exit 1
fi

# Pull latest changes from git
echo "📥 Pulling latest git changes..."
git pull origin main

# Build Docker images
echo "🔨 Building Docker images..."
docker compose build --pull

# Apply container updates
echo "🔄 Starting updated containers..."
docker compose up -d --remove-orphans

# Clean up dangling images
echo "🧹 Pruning old Docker images..."
docker image prune -f

# Verify container health
echo "🩺 Checking container status..."
sleep 5
docker compose ps

echo "=========================================================="
echo "✅ Deployment completed successfully!"
echo "🌐 Your site is live!"
echo "=========================================================="
