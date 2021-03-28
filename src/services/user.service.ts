import { insert, find, remove } from './dbAccessFunctions';
import IUser from '../interfaces/user';
import hashString from '../external_functions/hash';

const usersCollection = process.env.MONGO_USERS_COLLECTION!;

export const findUserByEmail: (email: string) => Promise<IUser[]> = async (email) => {
	return await find(usersCollection, { email });
}

export const serviceSignUp = async (query: IUser) => {
  const result = await findUserByEmail(query.email);
  if (result.length !== 0) {
    throw Error('Email address already used');
  }
  try {
    const { email, password } = query;
    const hashedPassword = await hashString(password);
    return await insert(usersCollection, { email, password: hashedPassword });
  } catch (e) {
    throw Error('Error while inserting user');
  }
}

export const serviceGetUser = async (email: string) => {
  try {
    return await find(usersCollection, { email });
  } catch (e) {
    throw Error('Error while retrieving user');
  }
}

export const serviceDeleteUser = async (email: string) => {
  try {
    return await remove(usersCollection, { email });
  } catch (e) {
    throw Error('Error while deleting user');
  }
}