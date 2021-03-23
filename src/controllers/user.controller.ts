import { Request, Response } from 'express';
import { serviceSignUp } from '../services/user.service';
import MongoUser from '../models/user.model';

export const signUp = (req: Request, res: Response) => {
	let query = req.body;
	//control request parameters
	
	MongoUser.find({ email: req.body.email }).exec()
	.then(async (user: any) => {
		if (user.length >= 1) {
			return res.status(409).json({msg: 'Email address already used'});
		} else {
			try {
				await serviceSignUp(query);
				return res.status(200).json({ status: 200, msg: 'User created' });
			} catch (e) {
				return res.status(400).json({ status: 400, msg: e.message });
			}
		}
	})
}