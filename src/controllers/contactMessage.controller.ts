import { Request, Response } from 'express';
import { serviceContactMessage } from '../services/contactMessage.service';
import { insertMessage } from '../data-access/dbAccess';

export const sendMessage = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		serviceContactMessage(insertMessage, query);
		return res.status(200).json({msg: 'Message sent successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}