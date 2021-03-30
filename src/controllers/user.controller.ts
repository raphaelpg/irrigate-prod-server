import { Request, Response } from 'express';
import { serviceGetUser, serviceRegister, serviceDeleteUser, serviceLogin } from '../services/user.service';
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
// import signJWT from '../functions/signJWT';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_KEY || 'secret';

const register = async (req: Request, res: Response) => {
	if (typeof(req.body.email) !== 'string') {
		return res.status(400).json({ status: 400, msg: 'Input must be a string' });
	}
	if (isEmpty(req.body.email) || !isEmail(req.body.email)) {
		return res.status(400).json({ status: 400, msg: 'Invalid email input' });
	}
	if (isEmpty(req.body.password) ||	!isLength(req.body.password, {min:5, max:undefined})) {
		return res.status(400).json({ status: 400, msg: 'Invalid password input' });
	}
	let query = req.body;
	try {
		await serviceRegister(query);
		return res.status(201).json({ status: 201, msg: 'User created' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

const login = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		if (!await serviceLogin(query)) {
			return res.status(400).json({ status: 400, msg: 'Unauthorized' });
		}
		const token2 = jwt.sign({ email: req.body.email }, jwtSecret, { algorithm: 'HS256', expiresIn: 600 });
		return res.status(200).json({ status: 200, msg: 'User authorized', token: token2, user: req.body.email });
		
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

const getUser = async (req: Request, res: Response) => {
	if (typeof(req.body.email) !== 'string') {
		return res.status(400).json({ status: 400, msg: 'Input must be a string' });
	}
	if (isEmpty(req.body.email) || !isEmail(req.body.email)) {
		return res.status(400).json({ status: 400, msg: 'Invalid email input' });
	}
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

const deleteUser = async (req: Request, res: Response) => {
	if (typeof(req.body.email) !== 'string') {
		return res.status(400).json({ status: 400, msg: 'Input must be a string' });
	}
	if (isEmpty(req.body.email) || !isEmail(req.body.email)) {
		return res.status(400).json({ status: 400, msg: 'Invalid email input' });
	}
	let query = req.body;
	try {
		await serviceDeleteUser(query.email);
		return res.status(200).json({ status: 200, msg: 'User deleted' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

export default {
	register,
	login,
	getUser,
	deleteUser
}