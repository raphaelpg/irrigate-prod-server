import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import MongoCause from '../models/cause';
import MongoUser from '../models/user';
import {Cause} from '../interfaces/cause';
import {User} from '../interfaces/user';
let router: express.Router = express.Router();

// const MONGO_ASSOCIATIONS_DB = process.env.MONGO_ASSOCIATIONS_DB ||'';
const MONGO_ASSOCIATIONS_DB = process.env.MONGO_TEMPORARY_ASSOCIATIONS_DB ||'';
const MONGO_USER_DB = process.env.MONGO_USER_DB ||'';

router.get('/api/causes', (req, res) => {
	let collection = mongoose.connection.collection(MONGO_ASSOCIATIONS_DB);
	collection.find({	}).toArray((err, data) => {
		if (err) throw err
		res.json(data)
	});
});

router.post('/api/addcause', (req, res) => {
	const {name, description, link, category, continent, country, address, logo, contactName, contactEmail}: Cause = req.body;
	const newCause: Cause = new MongoCause({
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
	collection.insertOne(newCause, (error) => {
		if (error) {
			res.status(500).json({ msg: 'Internal server error' });
		}
		res.status(200).json({msg: 'Cause added successfully'});
	});
})

router.post('/message', (req, res) => {
	console.log(req.body);
	res.status(200).json({msg: 'Message sent successfully'});
})

router.post('/signup', (req, res) => {
	console.log(req.body);
	MongoUser.find({ email: req.body.email }).exec()
	.then((user: any) => {
		if (user.length >= 1) {
			return res.status(409).json({
				msg: 'Email address already used'
			})
		} else {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({error: err})
				} else {
					const user: User = new MongoUser({
						email: req.body.email,
						password: hash
					})
					let collection = mongoose.connection.collection(MONGO_USER_DB)
					collection.insertOne(user, (err, result) => {
						if (err) {
							res.status(500).json({
								error: err
							})
						}
						res.status(201).json({
							msg: 'User created'
						})
					})
				}
			})
		}
	})
})

export = router;