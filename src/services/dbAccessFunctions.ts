import { MongoClient, Db } from 'mongodb';

const url: string = process.env.MONGO_URI!;
const dbName: string = process.env.MONGO_DB_NAME!;
const client = new MongoClient(
	url, 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

export const connectDb: () => Promise<Db> = async () => {
	if (!client.isConnected()) {
		await client.connect();
	}
	return client.db(dbName);
}

export const find: (collection: string, query: {}) => Promise<any[]> = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const result = await database.collection(collection).find({ ...query }).toArray();
  return result;
}

export const insert = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const date = Date.now().toString();
	const result = await database.collection(collection).insertOne({creationDate: date, ...query});
  if (result.insertedCount === 1) return result;
  throw Error('Error inserting item');
}

export const remove = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const result = await database.collection(collection).deleteOne({ ...query });
  if (result.deletedCount === 1) return result
  throw Error('Error deleting item');
}

export const update = async (collection: string, filter: {}, query: {}) => {
  const database = await connectDb();
  const result = await database.collection(collection).updateOne(filter, [{ $set: query }]);
  if (result.matchedCount === 1) return result;
  throw Error('Error updating item');
}