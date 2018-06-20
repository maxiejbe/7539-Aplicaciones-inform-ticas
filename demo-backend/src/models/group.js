import mongoose from 'mongoose';
import User from './user';
import Product from './product';
import Category from './category';

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

export const getGroupProducts = (products) => {
  let groupProducts = []
  products.reduce(function(res, value) {
    if (!res[value.product]) {
      res[value.product] = {
        quantity: 0,
        product:  value.product
      };
      groupProducts.push(res[value.product])
    }
    res[value.product].quantity += value.quantity
    return res;
  }, {});
  return groupProducts;
}

GroupSchema.post('init', function(group, next) {
  User.find({
    _id: {
      '$in': group.members
    }
  }).then(users => {

    group.fullMembers = users.map(user => {
      return {
        _id:      user._id,
        username: user.username,
        point:    user.point
      }
    });

    //Group user products to create a general group list
    let usersProducts    = users.map(user => user.products).flatten();
    let groupProducts    = getGroupProducts(usersProducts);
    let groupProductsIds = groupProducts.map(prod => prod.product);

    return Product.find({
      _id: {
        '$in': groupProductsIds
      }
    }).populate({
      path:  'category',
      model: Category
    }).then(products => {
      group.products = groupProducts.map(groupProduct => {
        return {
          product:  products.find(prod => prod._id.equals(groupProduct.product)),
          quantity: groupProduct.quantity
        }
      })
      next();
    })
  }).catch(err => {
    next();
  })
});


const Group = mongoose.model('group', GroupSchema)
export default Group
