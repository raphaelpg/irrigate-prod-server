import express from 'express';
import mongoose from 'mongoose';
import MongoContactMessage from '../models/contactMessage';
import IContactMessage from '../interfaces/contactMessage';
let messageRouter: express.Router = express.Router();

const MONGO_CONTACT_MESSAGES_DB = process.env.MONGO_CONTACT_MESSAGES_DB ||'';

messageRouter.post('/message', (req, res) => {
	const {name, email, message}: IContactMessage = req.body;
	const newContactMessage: IContactMessage = new MongoContactMessage({
		name: name,
		email: email,
		message: message
	});
	let collection = mongoose.connection.collection(MONGO_CONTACT_MESSAGES_DB);
	collection.insertOne(newContactMessage, (error) => {
		if (error) {
			res.status(500).json({msg: 'Internal server error'});
		}
		res.status(200).json({msg: 'Message sent successfully'})
	});
});

export = messageRouter;