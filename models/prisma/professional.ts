//professional.ts
import { Professional } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

export class ProfessionalModel {
	static async getAll(): Promise<Array<Professional>> {
		return await prisma.professional.findMany();
	}

	static async getByID(id: UUID): Promise<Professional> {
		const professional = await prisma.professional.findUnique({
			where: {
				id: id,
			},
		});
		if (professional === null) {
			throw new Error(`Professional with id: ${id} not found`);
		}
		return professional;
	}
	static async create(professional: Professional): Promise<Professional> {
		const createdProfessional = await prisma.professional.create({ data: professional });
		return createdProfessional;
	}

	static async update({ id, professional }: { id: UUID; professional: Partial<Professional> }): Promise<Professional> {
		const updatedProfessional = await prisma.professional.update({
			where: {
				id: id,
			},
			data: professional,
		});
		return updatedProfessional;
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		const deletedProfessional = await prisma.professional.delete({
			where: {
				id: id,
			},
		});
		return deletedProfessional;
	}
}
