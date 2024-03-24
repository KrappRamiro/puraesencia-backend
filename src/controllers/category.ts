import { validateCategory, validatePartialCategory } from "../schemas/category";
import { Request, Response } from "express";
import { CategoryModel } from "../models/prisma/category";
import { UUID } from "crypto";
import { Prisma } from "@prisma/client";

export class CategoryController {
	getAll = async (req: Request, res: Response) => {
		const categories = await CategoryModel.getAll();
		return res.json(categories);
	};

	getByID = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		const category = await CategoryModel.getByID(id);
		if (!category) {
			return res.status(404).json({ message: `Category ${id} not found :(` });
		}
		return res.json(category);
	};

	create = async (req: Request, res: Response) => {
		const validation = validateCategory(req.body);
		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const newCategory = await CategoryModel.create(validation.data);

		res.status(200).json(newCategory); // actualizar la cache del cliente
	};

	delete = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		try {
			const result = await CategoryModel.delete(id);
			return res.json({ messsage: `Category ${result} deleted` });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2016") {
					return res.status(404).json({ message: "Category not found" });
				}
			}
			return res.status(400).json(error);
		}
	};

	update = async (req: Request, res: Response) => {
		const validation = validatePartialCategory(req.body);

		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const id = req.params.id as UUID;

		const updatedCategory = await CategoryModel.update({
			id,
			category: validation.data,
		});

		return res.json(updatedCategory);
	};
}
