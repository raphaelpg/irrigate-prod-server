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
  // console.log("insert result: ", result.insertedCount)
  return result.ops[0];
}

export const remove = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const result = await database.collection(collection).deleteOne({ ...query });
  // console.log("remove result: ", result.deletedCount)
  return result;
}

export const update = async (collection: string, filter: {}, query: {}) => {
  const database = await connectDb();
  const result = await database.collection(collection).updateOne(filter, [{ $set: query }]);
  // console.log("update result: ", result.modifiedCount)
  return result;
}