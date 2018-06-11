import { Router } from 'express';
import users from './users';

export default ({ config, db }) => {
	let routes = Router();
		
	users(routes);
	
	return routes;
}
