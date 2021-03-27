import { MongoClient, Db } from 'mongodb';
import { insert, find, remove } from './dbAccess';
import hash from './hash';
import IAssociation from '../interfaces/association';
import IContactMessage from '../interfaces/contactMessage';
import IUser from '../interfaces/user';

const url: string = process.env.MONGO_URI!;
const dbName: string = process.env.MONGO_DB_NAME!;
const associationsCollection = process.env.MONGO_TEMPORARY_ASSOCIATIONS_COLLECTION!;
const usersCollection = process.env.MONGO_USERS_COLLECTION!;
const contactMessagesCollection = process.env.MONGO_CONTACT_MESSAGES_COLLECTION!;
const client = new MongoClient(
	url, 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

export const connectDb: () => Promise<Db> = async () => {
	if (!client.isConnected()) {
		await client.connect();
	}
	return client.db(dbName);
}

export const findUserByEmail: (email: string) => Promise<any[]> = async (email) => {
	return await find(usersCollection, { email });
}

export const findAllAssociations: () => Promise<IAssociation[]> = async () => {
	return await find(associationsCollection, {});
}

export const insertUser: (user: IUser) => Promise<IUser> = async ({ ...query }) => {
	const { email, password } = query;
	const hashedPassword = await hash(password);
	return await insert(usersCollection, { email, password: hashedPassword });
}

export const insertAssociation: (association: IAssociation) => Promise<IAssociation> = async ({ ...query }) => {
	return await insert(associationsCollection, { ...query });
}

export const insertContactMesssage: (message: IContactMessage) => Promise<IContactMessage> = async ({ ...query }) => {
	return await insert(contactMessagesCollection, { ...query });
}

export const deleteUserByEmail: (email: string) => void = async (email) => {
	return await remove(usersCollection, { email });
}

export const deleteAssociationByName: (name: string) => void = async (name) => {
	return await remove(associationsCollection, { name });
}

// export const updateAssociationByName: (name: string, ) => void = async ({ ...query })