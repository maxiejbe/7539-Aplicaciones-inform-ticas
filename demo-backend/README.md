7539-Aplicaciones-informaticas Demo backend
==================================
Express & ES6 REST API created from Boilerplate https://github.com/developit/express-es6-rest-api.

Prerequisites
---------------
* Node v8.11.2 (https://nodejs.org/es/download/)
* Mongo v3.2.20 (https://docs.mongodb.com/manual/installation/)

Getting Started
---------------

```sh
# clone it
git clone https://github.com/maxiejbe/7539-Aplicaciones-informaticas.git
cd demo-backend

# Install dependencies
npm install

# Start development live-reload server
PORT=3000 npm run dev

# Start production server:
PORT=3000 npm start
```

Configuration
-------------
Create `.env` file to store env variables:

```
TEST_MONGO_URL=<YOUR_TEST_MONGO_URL>
MONGO_URL=<YOUR_MONGO_URL>
PORT=<YOUR_PORT>
JWT_SECRET=<YOUR_JWT_SECRET>
```

Seeds
-------------
For initial database seeding: https://github.com/sharvit/mongoose-data-seed.

Running all seeds:
```
npm install -g mongoose-data-seed.
md-seed run
```


