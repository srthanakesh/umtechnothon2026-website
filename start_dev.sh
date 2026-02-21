#!/bin/bash
set -x  # Debug mode to see what commands are executed

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"  # Get absolute path of project root

echo "Starting Backend..."
osascript -e "tell app \"Terminal\" to do script \"cd '$ROOT_DIR/server' && npm run dev\""

echo "Starting Frontend..."
osascript -e "tell app \"Terminal\" to do script \"cd '$ROOT_DIR/client' && npm start\""