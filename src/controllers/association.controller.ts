import { Request, Response } from 'express';
import { serviceGetAssociations, serviceAddAssociation, serviceDeleteAssociation, serviceUpdateAssociation } from '../services/association.service';
import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail';

export const getAssociations = async (req: Request, res: Response) => {
	try {
		let associations = await serviceGetAssociations();
		return res.status(200).json({ status: 200, data: associations, msg: 'Associations retrieved successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
};

export const addAssociation = async (req: Request, res: Response) => {
	const requestValues = Object.values(req.body)
	let notAString = false;
	requestValues.forEach(item => {
		if (typeof(item) !== 'string') {
			notAString = true;
		};
	});
	if (notAString) {
		return res.status(400).json({ status: 400, msg: 'Input must be a string' });
	}
	if (
		isEmpty(req.body.name) || 
		isEmpty(req.body.description) || 
		isEmpty(req.body.category) || 
		isEmpty(req.body.continent) || 
		isEmpty(req.body.country) ||
		isEmpty(req.body.contactName) ||
		isEmpty(req.body.contactEmail)
	) {
		return res.status(400).json({ status: 400, msg: 'Required input missing' });
	};
	if (!isEmail(req.body.contactEmail)) {
		return res.status(400).json({ status: 400, msg: 'Invalid email input' });
	};
	let query = req.body;
	try {
		await serviceAddAssociation(query);
		return res.status(200).json({ status: 200, msg: 'Association added successfully'});
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

export const deleteAssociation = async (req: Request, res: Response) => {
	if (typeof(req.body.name) !== 'string') {
		return res.status(400).json({ status: 400, msg: 'Input must be a string' });
	}
	if (isEmpty(req.body.name)) {
		return res.status(400).json({ status: 400, msg: 'Required input missing' });
	}
	let query = req.body;
	try {
		await serviceDeleteAssociation(query.name);
		return res.status(200).json({ status: 200, msg: 'Association deleted' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}

export const updateAssociation = async (req: Request, res: Response) => {
	const requestValues = Object.values(req.body)
	let notAString = false;
	requestValues.forEach(item => {
		if (typeof(item) !== 'string') {
			notAString = true;
		};
	});
	if (notAString) {
		return res.status(400).json({ status: 400, msg: 'Input must be a string' });
	}
	if (isEmpty(req.body.name)) {
		return res.status(400).json({ status: 400, msg: 'Required input missing' });
	}
	let query = req.body;
	let {name, ...rest} = query;
	try {
		await serviceUpdateAssociation({ "name": query.name }, rest);
		return res.status(200).json({ status: 200, msg: 'Association updated' });
	} catch (e) {
		return res.status(400).json({ status: 400, msg: e.message });
	}
}