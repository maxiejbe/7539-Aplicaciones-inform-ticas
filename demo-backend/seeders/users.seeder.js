import { Seeder } from 'mongoose-data-seed';
import User from '../src/models/user';
import roles from '../src/models/roles';
const format = require('string-format');

const FAKE_USERS_COUNT = 100;

let data = Array(FAKE_USERS_COUNT).fill().map((_, i) => {
  var randomRole = Math.floor(Math.random()*roles.length);

  return {
    username: format('user{0}@gmail.com', i),
    password: 'password',
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
