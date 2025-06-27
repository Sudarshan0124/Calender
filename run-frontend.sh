#!/bin/bash
echo "Starting frontend-only calendar application..."
cd client && npx vite --host 0.0.0.0 --port 5000
