import { MongoClient } from 'mongodb';

const mongoConfig = {
	serverUrl: 'mongodb://localhost:27017/',
	database: 'images'
};

let _connection = undefined;
let _db = undefined;

export default async () => {
	if (!_connection) {
		_connection = await MongoClient.connect(mongoConfig.serverUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		_db = await _connection.db(mongoConfig.database);
	}

	return _db;
};
