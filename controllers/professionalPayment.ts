import { validateProfessionalPayment, validatePartialProfessionalPayment } from "../schemas/professionalPayment";
import {
	validateProfessionalSubpayment,
	validatePartialProfessionalSubpayment,
} from "../schemas/professionalSubpayment";
import { Request, Response } from "express";
import { ProfessionalPaymentModel } from "../models/prisma/professionalPayment";
import { UUID } from "crypto";
import { Prisma, Professional_Payment_Subpayment } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

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
		const paymentValidation = validateProfessionalPayment(req.body);
		const subpaymentsValidations = req.body.subpayments.map((subpayment: Professional_Payment_Subpayment) =>
			validateProfessionalSubpayment(subpayment)
		);
	};
}
