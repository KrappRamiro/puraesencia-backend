import prisma from "./client";
import { UUID } from "crypto";
import { Service } from "@prisma/client";

export class ServiceModel {
	static async getAll(): Promise<Array<Service>> {
		return await prisma.service.findMany();
	}

	static async getById(id: UUID): Promise<Service> {
		return await prisma.service.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
	}

	static async create(service: Service): Promise<Service> {
		return await prisma.service.create({
			data: service,
		});
	}

	static async update({ id, service }: { id: UUID; service: Partial<Service> }): Promise<Service> {
		return await prisma.service.update({
			where: { id: id },
			data: service,
		});
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		return await prisma.service.delete({
			where: {
				id: id,
			},
		});
	}
}
