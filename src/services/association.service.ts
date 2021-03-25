import IAssociation from '../interfaces/association';

export const serviceGetAssociations = async (findAllAssociations: () => Promise<any>) => {
  try {
    const associations: IAssociation[] = await findAllAssociations();
    return associations;
  } catch (e) {
    throw Error('Error retrieving associations from database');
  }
};

export const serviceAddAssociation = async (insertAssociation: (query: IAssociation) => Promise<any>, query: IAssociation) => {
  try {
    await insertAssociation(query);
    return;
  } catch (e) {
    throw Error('Error on inserting association to database');
  }
}