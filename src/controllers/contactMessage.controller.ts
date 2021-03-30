import { Request, Response } from 'express';
import { serviceContactMessage } from '../services/contactMessage.service';

export const sendMessage = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		serviceContactMessage(query);
		return res.status(201).json({ status: 201, msg: 'Message sent successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}