# Start with a base PHP-Apache image
FROM php:8.1-apache

# Install PostgreSQL extensions
RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Copy PHP files to the Apache server directory
COPY . /var/www/html/

# Enable Apache modules (like rewrite for clean URLs)
RUN a2enmod rewrite