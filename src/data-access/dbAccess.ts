import { connectDb } from './index';

export const insert = async (collection: string, { ...query }) => {
	const database = await connectDb();
	const result = await database.collection(collection).insertOne({...query});
  return result.ops[0];
}

export const find = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const result = await database.collection(collection).find({ ...query }).toArray();
  return result;
}