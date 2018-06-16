import resource from 'resource-router-middleware';
import Group from '../models/group';

export default ({config, db}) => resource({

  id: 'group',

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
