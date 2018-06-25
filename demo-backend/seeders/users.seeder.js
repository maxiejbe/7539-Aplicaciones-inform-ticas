'use strict';

import { Seeder } from 'mongoose-data-seed';
import User from '../src/models/user';
import Product from '../src/models/product';
import roles from '../src/models/roles';
import generateRandomPoint from '../src/lib/geo';
import config from '../src/config';
import random from '../src/lib/number';
const format = require('string-format');


const FAKE_USERS_COUNT     = 10;
const FAKE_PRODUCTS_COUNT  = 10;
const MAX_PRODUCT_QUANTITY = 10;
const RANDOM_POINT_RADIUS  = config.searchRadius;
const RANDOM_POINT_CENTER  = {
  lat: -34.617529,
  lng: -58.368317
}

class UsersSeeder extends Seeder {

  async beforeRun() {
    this.products  = await Product.find({}).exec();
    this.usersData = this._generateUsers();
  }

  async shouldRun() {
    return User.count().exec().then(count => count === 0);
  }

  async run() {
    return User.create(this.usersData);
  }
  _generateUsers() {
    return Array(FAKE_USERS_COUNT).fill().map((_, i) => {
      var randomRole = random(roles.length);

      let randomPoint = generateRandomPoint(RANDOM_POINT_CENTER, RANDOM_POINT_RADIUS)
      let user        = {
        username: format('user{0}@gmail.com', i),
        password: 'password',
        point:    [randomPoint.lat, randomPoint.lng],
        role:     roles[randomRole]
      };

      if (user.role === config.consumerRole) {
        user.products = [...new Set(this._generateUserProducts())].map(product => {
          return this._generateProductQuantity(product);
        })
      }
      return user;
    })
  }

  _generateUserProducts() {
    return Array(FAKE_PRODUCTS_COUNT).fill().map((_, i) => {
      let randomProductIndex = random(this.products.length);
      return this.products[randomProductIndex];
    });
  }

  _generateProductQuantity(product) {
    let randomQuantity = random(MAX_PRODUCT_QUANTITY);
    return {
      product:  product._id,
      quantity: randomQuantity
    }
  }
}

export default UsersSeeder;
