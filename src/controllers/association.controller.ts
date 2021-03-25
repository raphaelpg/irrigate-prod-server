import { Request, Response } from 'express';
import { serviceGetAssociations, serviceAddAssociation } from '../services/association.service';
import { findAllAssociations, insertAssociation } from '../data-access/index';

export const getAssociations = async (req: Request, res: Response) => {
	try {
		let associations = await serviceGetAssociations(findAllAssociations);
		return res.status(200).json({ status: 200, data: associations, msg: 'Associations retrieved successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
};

export const addAssociation = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		await serviceAddAssociation(insertAssociation, query);
		return res.status(200).json({ status: 200, msg: 'Association added successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}