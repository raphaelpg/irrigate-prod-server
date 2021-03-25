import IContactMessage from '../interfaces/contactMessage';

export const serviceContactMessage = async (insertContactMesssage: (query: IContactMessage) => Promise<any>, query: IContactMessage) => {
	try {
		await insertContactMesssage(query);
		return;
	} catch (e) {
		throw Error('Error on inserting message');
	}
}