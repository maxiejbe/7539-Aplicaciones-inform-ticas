'use strict';

import { Seeder } from 'mongoose-data-seed';
import User from '../src/models/user';
import Group from '../src/models/group';
import generateRandomPoint from '../src/lib/geo';
import config from '../src/config'
import random from '../src/lib/number'
const format = require('string-format');

const data                     = []
const FAKE_GROUPS_COUNT        = 10;
const FAKE_GROUP_MEMBERS_COUNT = 5;
const RANDOM_POINT_RADIUS      = config.searchRadius;
const RANDOM_POINT_CENTER      = {
  lat: -34.617529,
  lng: -58.368317
}

class GroupsSeeder extends Seeder {

  async beforeRun() {
    this.users      = await User.find({}).exec();
    this.groupsData = this._generateGroups();
  }

  async shouldRun() {
    return Group.count().exec().then(count => count === 0);
  }

  async run() {
    return Group.create(this.groupsData);
  }

  _generateGroups() {
    return Array(FAKE_GROUPS_COUNT).fill().map((_, i) => {
      let randomPoint = generateRandomPoint(RANDOM_POINT_CENTER, RANDOM_POINT_RADIUS);

      let randomMembers = Array(FAKE_GROUP_MEMBERS_COUNT).fill().map((_, i) => {
        var randomMember = random(this.users.length);
        return this.users[randomMember]._id
      });

      return {
        name:    format('Grupo FIUBA {0}', i),
        point:   [randomPoint.lat, randomPoint.lng],
        members: [...new Set(randomMembers)],
        owner:   randomMembers[0]
      }
    });
  }
}
export default GroupsSeeder;