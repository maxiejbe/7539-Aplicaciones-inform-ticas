import resource from 'resource-router-middleware';
import Product from '../models/product';

export default ({ config, db }) => resource({

	id : 'product',

	/** GET / - List all entities */
	index(params, res) {
    Product.find(params.query)
    .then(products => {
      return res.json(products);
    })
    .catch(err => {
      return res.err(err);
    })
	},
});
