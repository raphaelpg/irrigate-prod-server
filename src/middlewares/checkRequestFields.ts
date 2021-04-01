import { Request, Response, NextFunction } from 'express';
import isEmpty from 'validator/lib/isEmpty';

const checkRequestFields = (...fieldNames: any[]) => {
	if (fieldNames[0] === "") {
		return (req: Request, res: Response, next: NextFunction) => {
			if(Object.entries(req.body).length === 0) {
				return res.status(400).json({ status: 400, msg: "Error in request field" });
			}
			const requestValues = Object.values(req.body)
			let trigger = false;
			requestValues.forEach((item: any) => {
				if (typeof(item) !== 'string') {
					trigger = true;
					return;
				}
				if (isEmpty(item)) {
					trigger = true;
				}
			})
			if (!trigger) {
				next();
			} else {
				return res.status(400).json({ status: 400, msg: "Error in request field" });
			}
		}
	} else {
		return (req: Request, res: Response, next: NextFunction) => {
			if(Object.entries(req.body).length === 0) {
				return res.status(400).json({ status: 400, msg: "Error in request field" });
			}
			const requestValues = Object.values(req.body)
			let trigger = false;
			requestValues.forEach((item: any) => {
				if (typeof(item) !== 'string') {
					trigger = true;
					return;
				}
			})
			if (!trigger) {
				let emptyTrigger = false;
				fieldNames.forEach((item: any) => {
					if (isEmpty(req.body[item])) {
						emptyTrigger = true;
						return;
					}
				})
				if(!emptyTrigger) {
					next();
				} else {
					return res.status(400).json({ status: 400, msg: "Error in request field" });
				}
			} else {
				return res.status(400).json({ status: 400, msg: "Error in request field" });
			}
		}
	}
};

export default checkRequestFields;