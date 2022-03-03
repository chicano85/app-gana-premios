BOILERPLATE NODE WITH MONGO - FORMACIÓN
=======================

# FEATURES

- Permission for Users (login, create, delete, update)
- User (login, create, delete, update, forgot password, recovery password)

# POSTMAN

- Enter credentials for postman

# Libraries

- Boom
- Cors
- Dotenv
- JWT
- Joi
- Moment
- Mongoose
- Passport
- Uuid

# Installation

- Clone repository
- Copy .env.dist into .env
- Run ./docker/build-docker-compose.sh
- Run ./docker/start-docker-compose.sh
- (For stopping) Run ./docker/stop-docker-compose.sh
- (For re-run) Run ./docker/start-docker-compose.sh
- (For view logs) Run ./docker/view-docker-web-logs.sh

# Install new dependence

- Install local with yarn, example: yarn add <package-name>
- Stop docker (./docker/stop-docker-compose.sh)
- Start docker (./docker/start-docker-compose.sh)
- With logs (./docker/view-docker-web-logs.sh) you can see the progress instalation

# Mongo
- Execute specific seed: node ./src/seeders/<seed-file>
