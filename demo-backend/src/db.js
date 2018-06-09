const mongoose = require('mongoose');
import config from './config.json';

export default callback => {
	let db = mongoose.connect('mongodb://localhost/' + config.dbName);
	callback(db);
}
