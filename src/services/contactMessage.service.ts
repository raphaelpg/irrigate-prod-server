import IContactMessage from '../interfaces/contactMessage';

export const serviceContactMessage = async (insertMessage: (query: IContactMessage) => Promise<any>, query: IContactMessage) => {
	try {
		await insertMessage(query);
		return;
	} catch (e) {
		throw Error('Error on inserting message');
	}
}