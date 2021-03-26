import IUser from '../interfaces/user';

export const serviceGetUser = async (findUserByEmail: (email: string) => Promise<any[]>, email: string) => {
  try {
    const user = await findUserByEmail(email);
    return user;
  } catch (e) {
    throw Error('Error while retrieving user');
  }
}

export const serviceSignUp = async (insertUser: (query: IUser) => Promise<IUser>, query: IUser) => {
  try {
    await insertUser(query);
    return;
  } catch (e) {
    throw Error('Error while inserting user');
  }
}

export const serviceDeleteUser = async (deleteUserByEmail: any, email: string) => {
  try {
    await deleteUserByEmail(email);
    return;
  } catch (e) {
    throw Error('Error while deleting user');
  }
}