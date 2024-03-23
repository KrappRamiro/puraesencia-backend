import { validateProfessionalPayment, validatePartialProfessionalPayment } from "../schemas/professionalPayment";

import { Request, Response } from "express";
import { ProfessionalPaymentModel } from "../models/prisma/professionalPayment";
import { UUID } from "crypto";
import { Prisma, Professional_Payment_Subpayment } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import zod from "zod";

export class ProfessionalPaymentsController {
	getAll = async (req: Request, res: Response) => {
		const professionalPayments = await ProfessionalPaymentModel.getAll();
		return res.json(professionalPayments);
	};

	getByID = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		const professionalPayment = await ProfessionalPaymentModel.getByID(id);
		if (!professionalPayment) {
			return res.status(404).json({ message: `Professional Payment ${id} not found :(` });
		}
		return res.json(professionalPayment);
	};

	create = async (req: Request, res: Response) => {
		const validation = validateProfessionalPayment(req.body);
		if (!validation.success) {
			return res.status(400).json({
				error: JSON.parse(validation.error.message),
			});
		}
		const newProfessionalPayment = await ProfessionalPaymentModel.create({
			...validation.data,
			professionalId: validation.data.professionalId as UUID,
		});

		res.status(200).json(newProfessionalPayment);
	};

	update = async (req: Request, res: Response) => {
		const validation = validatePartialProfessionalPayment(req.body);

		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const subpaymentsWithIds = validation.data.subpayments?.map((subpayment, index) => ({
			id: req.body.subpayments[index]?.id,
			...subpayment,
		}));

		const id = req.params.id as UUID;
		const updatedProfessionalPayment = await ProfessionalPaymentModel.update(id, {
			professionalId: validation.data.professionalId as UUID,
			date: validation.data.date,
			subpayments: subpaymentsWithIds,
		});

		return res.json(updatedProfessionalPayment);
	};

	delete = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		try {
			const result = await ProfessionalPaymentModel.delete(id);
			return res.json({ messsage: `Professional Payment ${result} deleted` });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2016") {
					return res.status(404).json({ message: "Professional Payment not found" });
				}
			}
			return res.status(400).json(error);
		}
	};
}
