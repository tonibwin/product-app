#!/bin/bash

# Start the Go server in the background
echo "Starting Go server..."
cd ../api && go run main.go &

# Start the React development server
echo "Starting React server..."
cd ../dashboard && npm run start

# Wait for both to complete
wait