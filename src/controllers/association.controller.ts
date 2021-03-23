import { Request, Response } from 'express';
import { serviceGetAssociations, serviceAddAssociation } from '../services/association.service';

export const getAssociations = async (req: Request, res: Response) => {
	// let query = req.body;
	//control request parameters;
	try {
		let associations = await serviceGetAssociations();
		return res.status(200).json({ status: 200, data: associations, msg: 'Associations retrieved successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
};

export const addAssociation = async (req: Request, res: Response) => {
	let query = req.body;
	// control request parameters
	try {
		await serviceAddAssociation(query);
		return res.status(200).json({ status: 200, msg: 'Association added successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}