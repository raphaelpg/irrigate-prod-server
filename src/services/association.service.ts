import { insert, find, remove, update } from './dbAccessFunctions';
import IAssociation from '../interfaces/association';

const associationsCollection = process.env.MONGO_TEMPORARY_ASSOCIATIONS_COLLECTION!;

export const serviceGetAssociations = async () => {
  try {
    const associations = await find(associationsCollection, {});
    return associations;
  } catch (e) {
    throw Error('Error retrieving associations from database');
  }
};

export const serviceAddAssociation = async (query: IAssociation) => {
  try {
    await insert(associationsCollection, { ...query });
    return;
  } catch (e) {
    throw Error('Error on inserting association to database');
  }
}

export const serviceDeleteAssociation = async (name: string) => {
  try {
    await remove(associationsCollection, { name });
    return;
  } catch (e) {
    throw Error('Error while deleting association');
  }
}

export const serviceUpdateAssociation = async (name: {}, query: {}) => {
  try {
    await update(associationsCollection, name, query);
    return;
  } catch (e) {
    throw Error('Error while updating association'); 
  }
}