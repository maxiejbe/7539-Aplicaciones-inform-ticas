import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: {
    type:     String,
    required: true
  },
  point: {
    type:  [Number],
    index: '2d'
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

const Group = mongoose.model('group', GroupSchema)
export default Group
