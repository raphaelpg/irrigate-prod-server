import { connectDb } from './index';

export const find = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const result = await database.collection(collection).find({ ...query }).toArray();
  return result;
}

export const insert = async (collection: string, { ...query }) => {
	const database = await connectDb();
  const date = Date.now().toString();
	const result = await database.collection(collection).insertOne({creationDate: date, ...query});
  return result.ops[0];
}