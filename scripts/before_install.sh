#!/bin/bash
# Install Node.js and npm
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

# Clean old application files
sudo rm -rf /home/ec2-user

sudo chown -R ec2-user:ec2-user /home/ec2-user/.npm
