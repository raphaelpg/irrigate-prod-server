import { Request, Response } from 'express';
import { serviceContactMessage } from '../services/contactMessage.service';
import { connectDb } from '../data-access/index';

export const sendMessage = async (req: Request, res: Response) => {
	let query = req.body;
	//control request parameters
	try {
		serviceContactMessage(connectDb, query);
		return res.status(200).json({msg: 'Message sent successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}