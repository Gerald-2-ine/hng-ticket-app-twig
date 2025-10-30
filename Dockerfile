# Use the official PHP image with Apache
FROM php:8.3.13-apache

# Enable Apache mod_rewrite for clean URLs
RUN a2enmod rewrite

# Set the working directory
WORKDIR /var/www/html

# Copy project files to the container
COPY . /var/www/html/

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install project dependencies
RUN composer install --no-dev --optimize-autoloader

# Set the Apache document root to the public folder
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

# Update Apache config to use the public folder
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]
