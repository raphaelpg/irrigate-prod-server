import express from 'express';
import mongoose from 'mongoose';
import MongoCause from '../models/cause'
import {Cause} from '../interfaces/cause'
let router: express.Router = express.Router();

const MONGO_ASSOCIATIONS_DB = process.env.MONGO_ASSOCIATIONS_DB ||'';

router.get('/api/causes', (req, res) => {
	let collection = mongoose.connection.collection(MONGO_ASSOCIATIONS_DB);
	collection.find({	}).toArray((err, data) => {
		if (err) throw err
		res.json(data)
	});
});

router.post('/api/addcause', (req, res) => {
	const {name, description, link, category, continent, country, address, logoName, logo}: Cause = req.body;
	const newCause: Cause = new MongoCause({
		name: name,
		description: description,
		link: link,
		category: category,
		continent: continent,
		country: country,
		address: address,
		logoName: logoName,
		logo: logo,
	});
	let collection = mongoose.connection.collection(MONGO_ASSOCIATIONS_DB);
	collection.insertOne(newCause, (error) => {
		if (error) {
			res.status(500).json({ msg: 'Internal server error' });
		}
		res.status(200).json({msg: 'Cause added successfully'});
		//send email to cause poster
		//send email to owner
	})
})

export = router;