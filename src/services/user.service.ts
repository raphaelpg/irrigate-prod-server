import { insert, find, remove } from './dbAccessFunctions';
import IUser from '../interfaces/user';
import hashString from '../functions/hash';
import bcrypt from 'bcrypt';

const usersCollection = process.env.MONGO_USERS_COLLECTION!;

export const findUserByEmail: (email: string) => Promise<IUser[]> = async (email) => {
	const result = await find(usersCollection, { email });
  return result;
}

export const serviceRegister = async (query: IUser) => {
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
    const user = await find(usersCollection, { email });
    delete user[0].password;
    return user;
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

export const serviceLogin = async (query: IUser) => {
  const users = await findUserByEmail(query.email);
  if (users.length === 0) {
    throw Error("Can't find user");
  }
  try {
    const compare = await bcrypt.compare(query.password, users[0].password)
    return compare;
  } catch {
    throw Error('Error when trying to login')
  }
}