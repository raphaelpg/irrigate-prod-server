import express from 'express';
import mongoose from 'mongoose';
import MongoAssociation from '../models/association';
import IAssociation from '../interfaces/association';
let associationRouter: express.Router = express.Router();

// const MONGO_ASSOCIATIONS_DB = process.env.MONGO_ASSOCIATIONS_DB ||'';
const MONGO_ASSOCIATIONS_DB = process.env.MONGO_TEMPORARY_ASSOCIATIONS_DB ||'';

associationRouter.get('/api/associations', (req, res) => {
	let collection = mongoose.connection.collection(MONGO_ASSOCIATIONS_DB);
	collection.find({	}).toArray((err, data) => {
		if (err) throw err
		res.json(data)
	});
});

associationRouter.post('/api/add_association', (req, res) => {
	const {name, description, link, category, continent, country, address, logo, contactName, contactEmail}: IAssociation = req.body;
	const newAssociation: IAssociation = new MongoAssociation({
		name: name,
		description: description,
		link: link,
		category: category,
		continent: continent,
		country: country,
		address: address,
		logo: logo,
		contactName: contactName,
		contactEmail: contactEmail
	});
	let collection = mongoose.connection.collection(MONGO_ASSOCIATIONS_DB);
	collection.insertOne(newAssociation, (error) => {
		if (error) {
			res.status(500).json({msg: 'Internal server error'});
		}
		res.status(200).json({msg: 'Association added successfully'});
	});
});

export = associationRouter;