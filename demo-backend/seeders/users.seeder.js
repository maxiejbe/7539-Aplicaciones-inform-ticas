'use strict';

import { Seeder } from 'mongoose-data-seed';
import User from '../src/models/user';
import roles from '../src/models/roles';
import generateRandomPoint from '../src/lib/geo';
const format = require('string-format');

const FAKE_USERS_COUNT    = 100;
const RANDOM_POINT_RADIUS = 500;
const RANDOM_POINT_CENTER = {
  lat: -34.617529,
  lng: -58.368317
}

let data = Array(FAKE_USERS_COUNT).fill().map((_, i) => {
  var randomRole = Math.floor(Math.random() * roles.length);

  let randomPoint = generateRandomPoint(RANDOM_POINT_CENTER, RANDOM_POINT_RADIUS)
  return {
    username: format('user{0}@gmail.com', i),
    password: 'password',
    point:    [randomPoint.lat, randomPoint.lng],
    //TODO: Generate product list if role is consumer [{id, quantity}...]
    role: roles[randomRole]
  }
})

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.count().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;
