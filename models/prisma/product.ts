import prisma from "./client";
import { UUID } from "crypto";
import { Product } from "@prisma/client";

export class ProductModel {
	static async getAll(): Promise<Array<Product>> {
		return await prisma.product.findMany();
	}

	static async getById(id: UUID): Promise<Product> {
		return await prisma.product.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
	}

	static async create(product: Product): Promise<Product> {
		return await prisma.product.create({
			data: product,
		});
	}

	static async update({ id, product }: { id: UUID; product: Partial<Product> }): Promise<Product> {
		return await prisma.product.update({
			where: { id: id },
			data: product,
		});
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		return await prisma.product.delete({
			where: {
				id: id,
			},
		});
	}
}
