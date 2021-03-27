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

export const remove = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const result = await database.collection(collection).deleteOne({ ...query });
  return result;
}

export const update = async (collection: string, { ...query }) => {
  const database = await connectDb();
  const result = await database.collection(collection).updateOne({ ...query }, { ...query });
  return result;
}