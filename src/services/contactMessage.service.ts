import mongoose from 'mongoose';
import MongoContactMessage from '../models/contactMessage.model';
import IContactMessage from '../interfaces/contactMessage';

const MONGO_CONTACT_MESSAGES_DB = process.env.MONGO_CONTACT_MESSAGES_DB ||'';

export const serviceContactMessage = (query: IContactMessage) => {
	const newContactMessage: IContactMessage = new MongoContactMessage({
		name: query.name,
		email: query.email,
		message: query.message
	});
	let collection = mongoose.connection.collection(MONGO_CONTACT_MESSAGES_DB);
	collection.insertOne(newContactMessage, (error) => {
		if (error) {
      throw Error('Error on inserting message');
		}
		return;
	});
}