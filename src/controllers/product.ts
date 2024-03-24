import { validateProduct, validatePartialProduct } from "../schemas/product";
import { Request, Response } from "express";
import { ProductModel } from "../models/prisma/product";
import { UUID } from "crypto";
import { Prisma } from "@prisma/client";

export class ProductController {
	getAll = async (req: Request, res: Response) => {
		const products = await ProductModel.getAll();
		return res.json(products);
	};

	getByID = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		const product = await ProductModel.getByID(id);
		if (!product) {
			return res.status(403).json({ message: `Product ${id} not found :(` });
		}
		return res.json(product);
	};

	create = async (req: Request, res: Response) => {
		const validation = validateProduct(req.body);
		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const newProduct = await ProductModel.create(validation.data);

		res.status(200).json(newProduct); // actualizar la cache del cliente
	};

	delete = async (req: Request, res: Response) => {
		const id = req.params.id as UUID;
		try {
			const result = await ProductModel.delete(id);
			return res.json({ messsage: `Product ${result} deleted` });
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === "P2016") {
					return res.status(404).json({ message: "Product not found" });
				}
			}
			return res.status(400).json(error);
		}
	};

	update = async (req: Request, res: Response) => {
		const validation = validatePartialProduct(req.body);

		if (!validation.success) {
			return res.status(400).json({ error: JSON.parse(validation.error.message) });
		}

		const id = req.params.id as UUID;

		const updatedProduct = await ProductModel.update({
			id,
			product: validation.data,
		});

		return res.json(updatedProduct);
	};
}
