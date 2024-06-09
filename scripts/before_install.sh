#!/bin/bash

# Install the latest Node.js and npm
curl -sL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
sudo yum install -y nodejs

sudo npm cache clean --force
# Clean old application files with elevated permissions
sudo rm -rf /home/ec2-user

