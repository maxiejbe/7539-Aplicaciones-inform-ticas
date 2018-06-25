# 7539-Aplicaciones-informaticas Demo
---------------
Installation guide for Ubuntu 16.04 LTS.

## Components
* Demo backend: Express & ES6 REST API created from Boilerplate https://github.com/developit/express-es6-rest-api.
* Demo frontend: Static website (HTML + CSS + JS).

## Prerequisites
* Node v8.11.2 (https://nodejs.org/es/download/)
* Mongo v3.2.20 (https://docs.mongodb.com/manual/installation/)

## Getting started
```sh
# clone it
git clone https://github.com/maxiejbe/7539-Aplicaciones-informaticas.git
cd demo-backend

# Install dependencies
npm install
```

## Configuration
```sh
cd demo-backend
```

Create `.env` file with the following env variables:

```
MONGO_URL=mongodb://localhost/demo-db
TEST_MONGO_URL=mongodb://localhost/demo-test-db
PORT=3000
JWT_SECRET=secret
```

## Seeds
For initial database seeding: https://github.com/sharvit/mongoose-data-seed.

Running all seeds:
```
cd demo-backend
npm install -g mongoose-data-seed
md-seed run --dropdb
```

## Tests
Running all unit tests:
```
cd demo-backend
npm run test
```
## Running
```sh
# Start development live-reload server
npm run dev
```
Demo is running on http://localhost:3000/app/login.html.

## Login
You can both login as consumer or provider role.

Users are generated with random role:
* Email: __userN@gmail.com__ (where N goes from 1 to 100)
* Password: __password__
