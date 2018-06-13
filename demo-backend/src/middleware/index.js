import { Router } from 'express';
import users from './users';
import passport from 'passport';
import isAuthenticated from './common/isAuthenticated';

export default ({ config, db }) => {
	let routes = Router();
	
	routes.all('*', isAuthenticated());

	routes.use(users);
	
	return routes;
}
