import { Db } from 'mongodb';
import { connectDb } from './index';
import bcrypt from 'bcrypt';
import IContactMessage from '../interfaces/contactMessage';
import IUser from '../interfaces/user';
import IAssociation from '../interfaces/association';
import MongoContactMessage from '../models/contactMessage.model';
import MongoUser from '../models/user.model';
import MongoAssociation from '../models/association.model';

const associationsCollection = process.env.MONGO_TEMPORARY_ASSOCIATIONS_COLLECTION || '';
const usersCollection = process.env.MONGO_USERS_COLLECTION || '';
const contactMessagesCollection = process.env.MONGO_CONTACT_MESSAGES_COLLECTION || '';

export const findAllAssociations: () => Promise<IAssociation[]> = async () => {
  const database: Db = await connectDb()
  const result: IAssociation[] = await database.collection(associationsCollection).find({}).toArray();
  return result;
};

export const insertAssociation: (query: IAssociation) => Promise<IAssociation> = async (query: IAssociation) => {
  const {name, description, link, category, continent, country, address, logo, contactName, contactEmail}: IAssociation = query;
  const newAssociation: IAssociation = new MongoAssociation({
    name,
    description,
    link,
    category,
    continent,
    country,
    address,
    logo,
    contactName,
    contactEmail
  });
  const database: Db = await connectDb();
  const result = await database.collection(associationsCollection).insertOne(newAssociation);
  return result.ops[0];
}

export const insertMessage = async (query: IContactMessage) => {
  const { name, email, message }: IContactMessage = query;
  const newContactMessage: IContactMessage = new MongoContactMessage({
    name: name,
    email: email,
    message: message
  });
  const database: Db = await connectDb();
  const result = await database.collection(contactMessagesCollection).insertOne(newContactMessage);
  return result.ops[0];
}

export const insertUser = async (query: IUser) => {
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
        const result = await database.collection(usersCollection).insertOne(newUser);
        return result.ops[0];
      }
    });
  } catch (e) {
    throw Error('Error while inserting user');
  }
}

export const findUserByEmail = async (email: string) => {
  const database = await connectDb();
  const result = await database.collection(usersCollection).find({ email: email });
  return result;
}