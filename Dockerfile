FROM node:8.15.0

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

# Create app directory
WORKDIR /var/www

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

# Copy app source code
ADD . /var/www/

# Copy env
COPY .env.docker /var/www/.env

# Expose port and start application
EXPOSE 3009

CMD [ "yarn", "start" ]