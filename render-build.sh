#!/bin/bash
set -e

echo "Starting build process..."

# Install dependencies in root directory
echo "Installing root dependencies with production flag..."
npm install --production

# Make a backup of the root package.json
echo "Checking if package.json exists in root..."
if [ -f "package.json" ]; then
  echo "Making a backup of package.json..."
  cp package.json package.json.bak
fi

# Navigate to client directory and build the React app
echo "Building client application..."
cd client || { echo "Client directory not found"; exit 1; }
npm install
CI=false npm run build

# Return to root directory 
cd ..

# Install server dependencies if server directory exists
if [ -d "server" ]; then
  echo "Installing server dependencies..."
  cd server || { echo "Server directory not found"; exit 1; }
  npm install
  cd ..
fi

# Copy package-lock.json to root if it doesn't exist
if [ ! -f "package-lock.json" ] && [ -f "client/package-lock.json" ]; then
  echo "Copying client package-lock.json to root for dependency tracking..."
  cp client/package-lock.json package-lock.json
fi

# Make sure express is installed in the root directory
echo "Ensuring express and critical dependencies are installed..."
npm install express cors mongoose dotenv jsonwebtoken bcryptjs path fs

echo "Build completed successfully!"
