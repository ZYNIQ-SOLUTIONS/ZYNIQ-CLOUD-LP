#!/bin/bash

# ZYNIQ Landing Pages - Quick Launch Script
# This script starts both the frontend and backend services

set -e

echo "🔴 ZYNIQ Landing Pages - Launch Sequence"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in landing_pages directory"
    echo "Run: cd landing_pages && ./launch.sh"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if backend is running
echo "🔍 Checking backend status..."
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Backend is running on port 5000"
else
    echo "⚠️  Backend not detected on port 5000"
    echo "   Start backend with: cd ../backend && python run.py"
    echo ""
fi

# Start the development server
echo "🚀 Starting Next.js development server on port 3555..."
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Landing Pages:"
echo "  • http://localhost:3555/core"
echo "  • http://localhost:3555/cloud"
echo "  • http://localhost:3555/solutions"
echo "  • http://localhost:3555/studio"
echo ""
echo "Test Routes:"
echo "  • http://localhost:3555/404-test (Custom 404)"
echo "  • http://localhost:3555/api/waitlist (API)"
echo ""
echo "Assets Generated:"
echo "  • 6 favicons (all sizes)"
echo "  • 3 OG images (PNG + SVG)"
echo "  • Custom 404 page"
echo "  • Waitlist system with Command IDs"
echo ""
echo "Press Ctrl+C to stop"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

npm run dev
