#!/bin/bash
set -e

echo "Starting build process..."

# Install dependencies in root directory
echo "Installing root dependencies..."
npm install

# Navigate to client directory and build the React app
echo "Building client..."
cd client || { echo "Client directory not found"; exit 1; }
npm install
CI=false npm run build

# Return to root directory 
cd ..

# Install server dependencies
echo "Installing server dependencies..."
cd server || { echo "Server directory not found"; exit 1; }
npm install
cd ..

# No need to build server since it's just Node.js
echo "Build completed successfully!"
