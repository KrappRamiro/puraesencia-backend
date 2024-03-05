//category.ts
import prisma from "./client";
import { UUID } from "crypto";
import { Category, Prisma } from "@prisma/client";

type CategoryInput = Omit<Category, "id">;

export class CategoryModel {
	static async getAll(): Promise<Array<Category>> {
		return await prisma.category.findMany();
	}

	static async getById(id: UUID): Promise<Category | null> {
		return await prisma.category.findUnique({
			where: {
				id: id,
			},
		});
	}

	static async create(category: CategoryInput): Promise<Category> {
		return await prisma.category.create({
			data: category,
		});
	}

	static async update({ id, category }: { id: UUID; category: Partial<Category> }): Promise<Category> {
		return await prisma.category.update({
			where: { id: id },
			data: category,
		});
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		return await prisma.category.delete({
			where: {
				id: id,
			},
		});
	}
}
