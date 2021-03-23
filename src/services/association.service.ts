import mongoose from 'mongoose';
import MongoAssociation from '../models/association.model';
import IAssociation from '../interfaces/association';

// const MONGO_ASSOCIATIONS_DB = process.env.MONGO_ASSOCIATIONS_DB ||'';
const MONGO_ASSOCIATIONS_DB = process.env.MONGO_TEMPORARY_ASSOCIATIONS_DB ||'';

export const serviceGetAssociations = async () => {
  try {
    let collection = mongoose.connection.collection(MONGO_ASSOCIATIONS_DB);
    let associations = await collection.find({ }).toArray();
    return associations;
  } catch (e) {
    throw Error('Error retrieving associations from database');
  }
};

export const serviceAddAssociation = async (query: IAssociation) => {
  try {
    const {name, description, link, category, continent, country, address, logo, contactName, contactEmail}: IAssociation = query;
    const newAssociation: IAssociation = new MongoAssociation({
      name: name,
      description: description,
      link: link,
      category: category,
      continent: continent,
      country: country,
      address: address,
      logo: logo,
      contactName: contactName,
      contactEmail: contactEmail
    });
    let collection = mongoose.connection.collection(MONGO_ASSOCIATIONS_DB);
    await collection.insertOne(newAssociation);
    return;
  } catch (e) {
    throw Error('Error on inserting association to database');
  }
}