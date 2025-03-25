# Start with a base Node.js image to build the Vite app
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Start with a base PHP-Apache image to serve the built files
FROM php:8.1-apache

# Copy the built files to the Apache server directory
COPY --from=build /app/dist /var/www/html/

# Enable Apache modules (like rewrite for clean URLs)
RUN a2enmod rewrite

# Change Apache to listen on port 8080
RUN sed -i 's/Listen 80/Listen 8080/' /etc/apache2/ports.conf
RUN sed -i 's/:80>/:8080>/' /etc/apache2/sites-available/000-default.conf

# Expose port 8080
EXPOSE 8080

# Start Apache server
CMD ["apache2-foreground"]
