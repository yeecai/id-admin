# Base image
# FROM --platform=linux/arm64 node:18
FROM node:18
# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build --production

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
