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
		const paymentMethod = await prisma.paymentMethod.findUnique({
			where: {
				id: id,
			},
		});

		return paymentMethod;
	}
	static async create(paymentMethod: PaymentMethodInput): Promise<PaymentMethod> {
		const createdPaymentMethod = await prisma.paymentMethod.create({ data: paymentMethod });
		return createdPaymentMethod;
	}

	static async update({
		id,
		paymentMethod,
	}: {
		id: UUID;
		paymentMethod: Partial<PaymentMethod>;
	}): Promise<PaymentMethod> {
		const updatedPaymentMethod = await prisma.paymentMethod.update({
			where: {
				id: id,
			},
			data: paymentMethod,
		});
		return updatedPaymentMethod;
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		const deletedPaymentMethod = await prisma.paymentMethod.delete({
			where: {
				id: id,
			},
		});
		return deletedPaymentMethod;
	}
}
