#!/bin/bash

# Install node.js
sudo apt-get install python-software-properties -y
sudo apt-add-repository ppa:chris-lea/node.js -y
sudo apt-get update
sudo apt-get install nodejs -y

sudo npm cache clean --force

# Clean old application files with elevated permissions
# sudo rm -rf /home/ec2-user

# Fix permissions for npm cache if it exists
# if [ -d "/home/ec2-user/.npm" ]; then
#   sudo chown -R 1000:1000 "/home/ec2-user/.npm"
# fi
