import { Db } from 'mongodb';
import bcrypt from 'bcrypt';
import MongoUser from '../models/user.model';
import IUser from '../interfaces/user';

const usersCollection = process.env.MONGO_USERS_COLLECTION || '';

export const serviceSignUp = async (connectDb: () => Promise<Db>, query: any) => {
  try {
    bcrypt.hash(query.password, 10, async (err, hash) => {
      if (err) {
        throw Error('Error hashing password');
      } else {
        const newUser: IUser = new MongoUser({
          email: query.email,
          password: hash
        });
        const database = await connectDb();
        await database.collection(usersCollection).insertOne(newUser);
        return;
      }
    });
  } catch (e) {
    throw Error('Error while inserting user');
  }
}