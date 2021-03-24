import { Request, Response } from 'express';
import { serviceSignUp } from '../services/user.service';
import { connectDb } from '../data-access/index';

const usersCollection = process.env.MONGO_USERS_COLLECTION ||'';

export const signUp = async (req: Request, res: Response) => {
	let query = req.body;
	//control request parameters
	try {
		const database = await connectDb();
		const result = await database.collection(usersCollection).find({ email: req.body.email }).count();
		if (result !== 0) {
			return res.status(409).json({msg: 'Email address already used'});
		} else {
			await serviceSignUp(connectDb, query);
			return res.status(200).json({ status: 200, msg: 'User created' });
		}
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}