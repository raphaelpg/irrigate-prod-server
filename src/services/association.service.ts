import { Db } from 'mongodb';
import MongoAssociation from '../models/association.model';
import IAssociation from '../interfaces/association';

// const associationsCollection = process.env.MONGO_ASSOCIATIONS_COLLECTION || '';
const associationsCollection = process.env.MONGO_TEMPORARY_ASSOCIATIONS_COLLECTION || '';

export const serviceGetAssociations = async (connectDb: () => Promise<Db>) => {
  try {
    const database: Db = await connectDb()
    const associations = await database.collection(associationsCollection).find({}).toArray();
    return associations;
  } catch (e) {
    throw Error('Error retrieving associations from database');
  }
};

export const serviceAddAssociation = async (connectDb: () => Promise<Db>, query: IAssociation) => {
  try {
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
    await database.collection(associationsCollection).insertOne(newAssociation);
    return;
  } catch (e) {
    throw Error('Error on inserting association to database');
  }
}