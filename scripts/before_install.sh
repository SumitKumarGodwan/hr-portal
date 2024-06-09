#!/bin/bash

# Install the latest Node.js and npm
curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
sudo yum install -y nodejs

# Clean old application files with elevated permissions
sudo rm -rf /home/ec2-user

# Fix permissions for npm cache if it exists
if [ -d "/home/ec2-user/.npm" ]; then
  sudo chown -R ec2-user:ec2-user /home/ec2-user/.npm
fi
