#!/bin/bash

# Build the application
npm run build

# Start the application
npm run start:prod

# Optionally, use PM2 or another process manager
# pm2 start dist/main.js --name nest-app
