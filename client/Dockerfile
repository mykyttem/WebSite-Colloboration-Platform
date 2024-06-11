# Use an official Node.js runtime as the base image
FROM node:latest as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the client application code to the container
COPY . .

# Build the React app
RUN npm run build

# Use NGINX as the base image for serving the React application
FROM nginx:alpine

# Copy the built React app from the previous stage to NGINX's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX to serve the React application
CMD ["nginx", "-g", "daemon off;"]