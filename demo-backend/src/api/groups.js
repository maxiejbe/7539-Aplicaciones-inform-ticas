import resource from 'resource-router-middleware';
import Group from '../models/group';

export default ({config, db}) => resource({

  id: 'group',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
    Group.findById(id).then(group => {
      callback(null, group)
    }).catch(err => {
      callback(err, null)
    })
  },

  /** GET /:id - Return a given entity */
  read({group}, res) {
    res.json(group);
  },

  /** GET / - List all entities */
  index(req, res) {
    let getGroups = Group.find({});
    switch (req.user.role) {
      case config.consumerRole:
        getGroups = Group.findByMember(req.user._id)
        break;
      case config.providerRole:
        getGroups = Group.findByRadius(req.user.point, config.searchRadius)
        break;
    }

    getGroups.then(groups => {
      return res.json(groups);
    }).catch(err => {
      return res.status(500).json(err);
    })
  },

});
