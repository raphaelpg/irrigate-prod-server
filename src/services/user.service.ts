import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import MongoUser from '../models/user.model';
import IUser from '../interfaces/user';

const MONGO_USER_DB = process.env.MONGO_USER_DB ||'';

export const serviceSignUp = async (query: any) => {
  try {
    bcrypt.hash(query.password, 10, (err, hash) => {
      if (err) {
        throw Error('Error hashing password');
      } else {
        const user: IUser = new MongoUser({
          email: query.email,
          password: hash
        });
        let collection = mongoose.connection.collection(MONGO_USER_DB);
        collection.insertOne(user, (err, result) => {
          if (err) {
            throw Error('Error inserting new user');
          }
            return;
        });
      }
    });
  } catch (e) {
    throw Error('Error while inserting user');
  }
}