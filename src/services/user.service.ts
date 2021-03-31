import dbAccessFunctions from '../functions/dbAccessFunctions';
import config from '../config/config';
import encryptFunctions from '../functions/encryptFunctions';
import IUser from '../interfaces/user';

const usersCollection = config.mongo.usersCollection;

const findUserByEmail: (email: string) => Promise<IUser[]> = async (email) => {
	const result = await dbAccessFunctions.find(usersCollection, { email });
  return result;
}

const serviceRegister = async (query: IUser) => {
  const result = await findUserByEmail(query.email);
  if (result.length !== 0) {
    throw Error('Email address already used');
  }
  try {
    const { email, password } = query;
    const hashedPassword = await encryptFunctions.hashString(password);
    return await dbAccessFunctions.insert(usersCollection, { email, password: hashedPassword });
  } catch (e) {
    throw Error('Error while inserting user');
  }
}

const serviceGetUser = async (email: string) => {
  try {
    const user = await dbAccessFunctions.find(usersCollection, { email });
    delete user[0].password;
    return user;
  } catch (e) {
    throw Error('Error while retrieving user');
  }
}

const serviceDeleteUser = async (email: string) => {
  try {
    return await dbAccessFunctions.remove(usersCollection, { email });
  } catch (e) {
    throw Error('Error while deleting user');
  }
}

const serviceLogin = async (query: IUser) => {
  const users = await findUserByEmail(query.email);
  if (users.length === 0) {
    throw Error("Can't find user");
  }
  try {
    const compare = await encryptFunctions.comparePasswords(query.password, users[0].password)
    return compare;
  } catch {
    throw Error('Error when trying to login')
  }
}

export default {
  findUserByEmail,
  serviceRegister,
  serviceGetUser,
  serviceDeleteUser,
  serviceLogin
}