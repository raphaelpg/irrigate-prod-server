import { Request, Response } from 'express';
import { serviceGetUser, serviceSignUp } from '../services/user.service';
import { findUserByEmail, insertUser } from '../data-access/index'

export const signUp = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		const result = await findUserByEmail(query.email);
		if (result.length !== 0) {
			return res.status(409).json({msg: 'Email address already used'});
		} else {
			await serviceSignUp(insertUser, query);
			return res.status(200).json({ status: 200, msg: 'User created' });
		}
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

export const getUser = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		const user = await serviceGetUser(findUserByEmail, query.email);
		return res.status(200).json({ status: 200, data: user, msg: 'User retrieved successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}