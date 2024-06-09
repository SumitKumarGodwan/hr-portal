#!/bin/bash
cd /home/ec2-user

# Start the Node.js server in the background and redirect output to logs
npm start > server.log 2> error.log < /dev/null &

# Wait for a few seconds to give the server some time to start
sleep 10

# Health check to ensure the server is running
if curl -s http://localhost:3000 > /dev/null; then
  echo "Application started successfully"
  exit 0
else
  echo "Application failed to start"
  exit 1
fi

# Optionally, use PM2 or another process manager
# pm2 start dist/main.js --name nest-app
