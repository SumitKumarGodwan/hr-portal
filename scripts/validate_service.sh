#!/bin/bash

# Check if the application is running
curl -f http://localhost:3000/health || exit 1
