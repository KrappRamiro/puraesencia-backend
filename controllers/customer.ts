import { validateCustomer, validatePartialCustomer } from "../schemas/customer";
import { Customer } from "@prisma/client";
import { Request, Response } from "express";
import { CustomerModel } from "../models/prisma/customer";
import { UUID } from "crypto";

export class CustomerController {
	getAll = async (req: Request, res: Response) => {
		const customers = await CustomerModel.getAll();
		return res.json(customers);
	};

	getById = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		const customer = await CustomerModel.getByID(id);
		if (!customer) {
			return res.status(403).json({ message: `Customer ${id} not found :(` });
		}
		return res.json(customer);
	};

	create = async (req: Request, res: Response) => {
		const validation = validateCustomer(req.body);
		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		// TODO: Imlement
		//const newCustomer = await CustomerModel.create(validation.data);
	};
}
