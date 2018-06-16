import mongoose from 'mongoose';

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


const Group = mongoose.model('group', GroupSchema)
export default Group
