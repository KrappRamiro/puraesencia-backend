import { validateCustomer, validatePartialCustomer } from "../schemas/customer";
import { Request, Response } from "express";
import { CustomerModel } from "../models/prisma/customer";
import { UUID } from "crypto";
import { Prisma } from "@prisma/client";

export class CustomerController {
	getAll = async (req: Request, res: Response) => {
		const customers = await CustomerModel.getAll();
		return res.json(customers);
	};

	getByID = async (req: Request, res: Response) => {
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

		const newCustomer = await CustomerModel.create(validation.data);

		res.status(200).json(newCustomer); // actualizar la cache del cliente
	};

	delete = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		try {
			const result = await CustomerModel.delete(id);
			return res.json({ messsage: `Customer ${result} deleted` });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2016") {
					return res.status(404).json({ message: "Customer not found" });
				}
			}
			return res.status(400).json(error);
		}
	};

	update = async (req: Request, res: Response) => {
		const validation = validatePartialCustomer(req.body);

		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const id = req.params.id as UUID;

		const updatedCustomer = await CustomerModel.update({
			id,
			customer: validation.data,
		});

		return res.json(updatedCustomer);
	};
}
