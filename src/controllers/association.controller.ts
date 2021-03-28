import { Request, Response } from 'express';
import { serviceGetAssociations, serviceAddAssociation, serviceDeleteAssociation, serviceUpdateAssociation } from '../services/association.service';
import { findAllAssociations, insertAssociation, deleteAssociationByName, updateAssociationByName } from '../data-access/index';

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

export const deleteAssociation = async (req: Request, res: Response) => {
	let query = req.body;
	try {
		await serviceDeleteAssociation(deleteAssociationByName, query.name);
		return res.status(200).json({ status: 200, msg: 'Association deleted' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

export const updateAssociation = async (req: Request, res: Response) => {
	let query = req.body;
	let {name, ...rest} = query;
	try {
		await serviceUpdateAssociation(updateAssociationByName, { "name": query.name }, rest);
		return res.status(200).json({ status: 200, msg: 'Association updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}