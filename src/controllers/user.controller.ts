import { Request, Response } from 'express';
import { serviceGetUser, serviceSignUp, serviceDeleteUser } from '../services/user.service';

export const signUp = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		await serviceSignUp(query);
		return res.status(200).json({ status: 200, msg: 'User created' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

export const getUser = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		const user = await serviceGetUser(query.email);
		if (user.length === 0) {
			return res.status(200).json({ status: 200, data: user, msg: 'User not found'});
		}
		return res.status(200).json({ status: 200, data: user, msg: 'User retrieved successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		await serviceDeleteUser(query.email);
		return res.status(200).json({ status: 200, msg: 'User deleted' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}