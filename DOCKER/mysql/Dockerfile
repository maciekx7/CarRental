FROM mysql:latest

## The maintainer name and email
MAINTAINER Maciej Krysiak <maciek.krysiak@hotmail.com>

# database = test and password for root = password
ENV MYSQL_DATABASE=carRentalDB \
    MYSQL_ROOT_PASSWORD=root

# when container will be started, we'll have `test` database created with this schema
COPY ./script.sql /docker-entrypoint-initdb.d/
