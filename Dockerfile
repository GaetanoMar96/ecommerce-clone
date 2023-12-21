# Use an official Node.js LTS image as the base image
FROM node:lts-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build the Angular app for production with the ng build command
RUN ng build

# Use a smaller base image for the final production image
FROM nginx:alpine

# Copy the built app from the 'build' stage to the NGINX web server's directory
COPY --from=build /app/dist/ecommerce-clone /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX when the container starts
CMD ["nginx", "-g", "daemon off;"]
