import IUser from '../interfaces/user';

export const serviceSignUp = async (insertUser: (query: IUser) => Promise<any>, query: IUser) => {
  try {
    await insertUser(query);
    return;
  } catch (e) {
    throw Error('Error while inserting user');
  }
}