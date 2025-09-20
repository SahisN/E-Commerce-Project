# Use postgres latest image
FROM postgres:latest

# Copy seed sql into the entrypoint initializaiton directory
COPY init.sql /docker-entrypoint-initdb.d/

