import mongodb from 'mongodb';
import 'dotenv/config';

const MongoClient = mongodb.MongoClient;
const url: string = process.env.MONGO_URI || '';
const dbName: string = process.env.MONGO_DB_NAME || '';
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export const connectDb: () => Promise<mongodb.Db> = async () => {
	if (!client.isConnected()) {
		await client.connect();
	}
	return client.db(dbName);
}