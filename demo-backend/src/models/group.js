import mongoose from 'mongoose';
import User from './user';

const GroupSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true
  },
  point: {
    type:  [Number],
    index: '2dsphere'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  }],
  owner: {
    type:     mongoose.Schema.Types.ObjectId,
    ref:      'User',
    required: true
  },
})

GroupSchema.statics.findByMember = function findByMember(userId) {
  const query = {
    'members': {
      '$in': [userId]
    }
  };
  return this.find(query);
};

GroupSchema.statics.findByRadius = function findByRadius(coords, maxDistance) {
  const query = {
    'point': {
      '$near': {
        '$geometry': {
          type:        'Point',
          coordinates: coords
        },
        '$maxDistance': maxDistance
      }
    }
  };
  return this.find(query);
};

GroupSchema.methods.toJSON = function() {
  return {
    _id:         this._id,
    name:        this.name,
    point:       this.point,
    owner:       this.owner,
    members:     this.members,
    fullMembers: this.fullMembers,
    products:    this.products
  };
};

GroupSchema.post('init', function(group, next) {
  User.find({
    _id: {
      '$in': group.members
    }
  }).then(users => {
    group.fullMembers = users;
    //group.products = users.map(user => user.products).flatten();
    next();
  }).catch(err => {
    next();
  })
});


const Group = mongoose.model('group', GroupSchema)
export default Group
