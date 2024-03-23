//paymentMethod.ts
import { PaymentMethod } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

type PaymentMethodInput = Omit<PaymentMethod, "id">;
export class PaymentMethodModel {
	static async getAll(): Promise<Array<PaymentMethod>> {
		return await prisma.paymentMethod.findMany();
	}

	static async getByID(id: UUID): Promise<PaymentMethod | null> {
		return await prisma.paymentMethod.findUnique({
			where: {
				id: id,
			},
		});
	}
	static async create(paymentMethod: PaymentMethodInput): Promise<PaymentMethod> {
		return await prisma.paymentMethod.create({ data: paymentMethod });
	}

	static async update({
		id,
		paymentMethod,
	}: {
		id: UUID;
		paymentMethod: Partial<PaymentMethodInput>;
	}): Promise<PaymentMethod> {
		return await prisma.paymentMethod.update({
			where: {
				id: id,
			},
			data: paymentMethod,
		});
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		return await prisma.paymentMethod.delete({
			where: {
				id: id,
			},
		});
	}
}
