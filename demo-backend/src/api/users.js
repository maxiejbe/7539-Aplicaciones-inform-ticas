import resource from 'resource-router-middleware';
import User from '../models/user';

export default ({ config, db }) => resource({

	id : 'user',

	index(req, res) {
    User.find()
    .then(users => {
      return res.json(users);
    })
    .catch(res.error);
	}
});
