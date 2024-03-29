import { validatePaymentMethod, validatePartialPaymentMethod } from "../schemas/paymentMethod";
import { Request, Response } from "express";
import { PaymentMethodModel } from "../models/prisma/paymentMethod";
import { UUID } from "crypto";
import { Prisma } from "@prisma/client";

export class PaymentMethodController {
	getAll = async (req: Request, res: Response) => {
		try {
			const categories = await PaymentMethodModel.getAll();
			return res.json(categories);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	getByID = async (req: Request, res: Response) => {
		try {
			const id = req.params.id as UUID;
			const paymentMethod = await PaymentMethodModel.getByID(id);
			if (!paymentMethod) {
				return res.status(404).json({ message: `PaymentMethod ${id} not found :(` });
			}
			return res.json(paymentMethod);
		} catch (error) {
			res.status(500).json(error);
		}
	};

	create = async (req: Request, res: Response) => {
		const validation = validatePaymentMethod(req.body);
		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const newPaymentMethod = await PaymentMethodModel.create(validation.data);

		res.status(201).json(newPaymentMethod); // actualizar la cache del cliente
	};

	delete = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		try {
			const result = await PaymentMethodModel.delete(id);
			return res.json({ messsage: `Payment Method ${result} deleted` });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2016") {
					return res.status(404).json({ message: "Payment Method not found" });
				}
			}
			return res.status(400).json(error);
		}
	};

	update = async (req: Request, res: Response) => {
		const validation = validatePartialPaymentMethod(req.body);

		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const id = req.params.id as UUID;

		const updatedPaymentMethod = await PaymentMethodModel.update({
			id,
			paymentMethod: validation.data,
		});

		return res.json(updatedPaymentMethod);
	};
}
