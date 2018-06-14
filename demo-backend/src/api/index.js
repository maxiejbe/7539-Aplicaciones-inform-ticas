import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import categories from './categories';
import products from './products';
import auth from './auth';

export default ({config, db}) => {
  let api = Router();

  // mount the facets resource
  api.use('/facets', facets({
    config,
    db
  }))

  api.use('/categories', categories({
    config,
    db
  }))

  api.use('/products', products({
    config,
    db
  }))

  api.use('/auth', auth)

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({
      version
    });
  });

  return api;
}
