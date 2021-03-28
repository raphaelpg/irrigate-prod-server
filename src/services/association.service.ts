import IAssociation from '../interfaces/association';

export const serviceGetAssociations = async (findAllAssociations: () => Promise<IAssociation[]>) => {
  try {
    const associations = await findAllAssociations();
    return associations;
  } catch (e) {
    throw Error('Error retrieving associations from database');
  }
};

export const serviceAddAssociation = async (insertAssociation: (query: IAssociation) => Promise<IAssociation>, query: IAssociation) => {
  try {
    await insertAssociation(query);
    return;
  } catch (e) {
    throw Error('Error on inserting association to database');
  }
}

export const serviceDeleteAssociation = async (deleteAssociationByName: any, name: string) => {
  try {
    await deleteAssociationByName(name);
    return;
  } catch (e) {
    throw Error('Error while deleting association');
  }
}

export const serviceUpdateAssociation = async (updateAssociationByName: any, name: {}, query: {}) => {
  const result = await updateAssociationByName(name, query);
  if (result.matchedCount === 1) return;
  throw Error('Error while updating association'); 
}