import { validateProfessional, validatePartialProfessional } from "../schemas/professional";
import { Request, Response } from "express";
import { ProfessionalModel } from "../models/prisma/professional";
import { UUID } from "crypto";
import { Prisma } from "@prisma/client";

export class ProfessionalController {
	getAll = async (req: Request, res: Response) => {
		const professionals = await ProfessionalModel.getAll();
		return res.json(professionals);
	};

	getByID = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		const professional = await ProfessionalModel.getByID(id);
		if (!professional) {
			return res.status(403).json({ message: `Professional ${id} not found :(` });
		}
		return res.json(professional);
	};

	create = async (req: Request, res: Response) => {
		const validation = validateProfessional(req.body);
		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const newProfessional = await ProfessionalModel.create(validation.data);

		res.status(200).json(newProfessional); // actualizar la cache del cliente
	};

	delete = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		try {
			const result = await ProfessionalModel.delete(id);
			return res.json({ messsage: `Professional ${result} deleted` });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2016") {
					return res.status(404).json({ message: "Professional not found" });
				}
			}
			return res.status(400).json(error);
		}
	};

	update = async (req: Request, res: Response) => {
		const validation = validatePartialProfessional(req.body);

		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const id = req.params.id as UUID;

		const updatedProfessional = await ProfessionalModel.update({
			id,
			professional: validation.data,
		});

		return res.json(updatedProfessional);
	};
}
