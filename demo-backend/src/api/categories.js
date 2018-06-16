import resource from 'resource-router-middleware';
import Category from '../models/category';

export default ({config, db}) => resource({

  id: 'category',

  /** GET / - List all entities */
  index({params}, res) {
    Category.find({})
      .then(categories => {
        return res.json(categories);
      })
      .catch(err => {
        return res.err(err);
      })
  },
});
