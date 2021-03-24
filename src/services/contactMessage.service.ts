import { Db } from 'mongodb';
import MongoContactMessage from '../models/contactMessage.model';
import IContactMessage from '../interfaces/contactMessage';

const contactMessagesCollection = process.env.MONGO_CONTACT_MESSAGES_COLLECTION || '';

export const serviceContactMessage = async (connectDb: () => Promise<Db>, query: IContactMessage) => {
	try {
		const { name, email, message }: IContactMessage = query;
		const newContactMessage: IContactMessage = new MongoContactMessage({
			name: name,
			email: email,
			message: message
		});
		const database: Db = await connectDb();
		await database.collection(contactMessagesCollection).insertOne(newContactMessage);
		return;
	} catch (e) {
		throw Error('Error on inserting message');
	}
}