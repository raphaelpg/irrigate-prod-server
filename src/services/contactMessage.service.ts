import { insert } from './dbAccessFunctions';
import IContactMessage from '../interfaces/contactMessage';

const contactMessagesCollection = process.env.MONGO_CONTACT_MESSAGES_COLLECTION!;

export const serviceContactMessage = async (query: IContactMessage) => {
	try {
		await insert(contactMessagesCollection, { ...query });
		return;
	} catch (e) {
		throw Error('Error on inserting message');
	}
}