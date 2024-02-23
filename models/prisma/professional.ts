//professional.ts
import { Professional } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

export class ProfessionalModel {
	static async getAll(): Promise<Array<Professional>> {
		return await prisma.professional.findMany();
	}

	static async getByID(id: UUID): Promise<Professional> {
		return await prisma.professional.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
	}

	static async create(professional: Professional): Promise<Professional> {
		return await prisma.professional.create({ data: professional });
	}

	static async update({ id, professional }: { id: UUID; professional: Partial<Professional> }): Promise<Professional> {
		return await prisma.professional.update({
			where: {
				id: id,
			},
			data: professional,
		});
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		return await prisma.professional.delete({
			where: {
				id: id,
			},
		});
	}
}
