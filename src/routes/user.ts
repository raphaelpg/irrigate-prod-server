import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import MongoUser from '../models/user';
import IUser from '../interfaces/user';
let userRouter: express.Router = express.Router();

const MONGO_USER_DB = process.env.MONGO_USER_DB ||'';

userRouter.post('/signup', (req, res) => {
	MongoUser.find({ email: req.body.email }).exec()
	.then((user: any) => {
		if (user.length >= 1) {
			return res.status(409).json({msg: 'Email address already used'});
		} else {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({error: err});
				} else {
					const user: IUser = new MongoUser({
						email: req.body.email,
						password: hash
					});
					let collection = mongoose.connection.collection(MONGO_USER_DB);
					collection.insertOne(user, (err, result) => {
						if (err) {
							res.status(500).json({error: err})
						}
						res.status(201).json({msg: 'User created'})
					});
				}
			});
		}
	});
})

export = userRouter;