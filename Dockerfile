# Base image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Listen to all network interface
ENV HOST=0.0.0.0

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD [ "npm", "start" ]