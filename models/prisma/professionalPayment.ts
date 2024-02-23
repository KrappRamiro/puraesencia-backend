//professionalPayment.ts
import { ProfessionalPayment, ProfessionalPayment_PaymentMethods } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

export class ProfessionalPaymentModel {
	static async getAll(): Promise<Array<ProfessionalPayment>> {
		return await prisma.professionalPayment.findMany();
	}

	static async getByID(id: UUID): Promise<ProfessionalPayment> {
		return await prisma.professionalPayment.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
	}
	static async create(input: {
		date: Date;
		professionalId: UUID;
		payments: Array<ProfessionalPayment_PaymentMethods>;
	}): Promise<ProfessionalPayment> {
		try {
			// Step 1: Create a new ProfessionalPayment record
			const newProfessionalPayment = await prisma.professionalPayment.create({
				data: {
					date: input.date,
					professional: {
						connect: {
							id: input.professionalId,
						},
					},
				},
			});

			// Step 2: Create records for ProfessionalPayment_PaymentMethods and associate them with the new ProfessionalPayment
			const createdPaymentMethods = await Promise.all(
				input.payments.map(async (payment) => {
					return prisma.professionalPayment_PaymentMethods.create({
						data: {
							professionalPayment: {
								connect: { id: newProfessionalPayment.id },
							},
							paymentMethod: {
								connect: { id: payment.paymentMethodId },
							},
							amount: payment.amount,
						},
					});
				})
			);
			console.log("New professional payment created:", newProfessionalPayment);
			console.log("Associated payment methods:", createdPaymentMethods);
			return newProfessionalPayment; // return the created ProfessionalPayment
		} catch (e) {
			console.error(e);
			throw new Error(`Failed to create professional payment ${e}`);
		}
	}

	static async update(
		id: UUID,
		input: { date?: Date; professionalId: UUID; payments: Array<ProfessionalPayment_PaymentMethods> }
		// ): Promise<ProfessionalPayment> {
	) {
		try {
			// Step 1: Find the existing ProfessionalPayment record
			const existingProfessionalPayment = await prisma.professionalPayment.findUniqueOrThrow({
				where: {
					id: id,
				},
				include: {
					payments: true, // Include nested payments
				},
			});

			// Step 2. Update the fields if provided
			const updatedPayment = await prisma.professionalPayment.update({
				where: {
					id: id,
				},
				data: {
					date: input.date ?? existingProfessionalPayment.date, // If date is provided, update it; otherwise, keep the existing value
					professional: {
						connect: {
							id: input.professionalId,
						},
					},
					payments: {
						// Here we replace payments with newer ones
						// It is needed to delete the old payment first, and then create new ones
						deleteMany: {
							// Delete existing payments
							id: { in: existingProfessionalPayment.payments.map((payment) => payment.id) },
						},
						createMany: {
							// Create new payments
							// This uses the () => ({}) shorthand for returning an object
							data: input.payments.map((payment) => ({
								id: payment.professionalPaymentsId,
								paymentMethodId: payment.paymentMethodId,
								amount: payment.amount,
							})),
						},
					},
				},
				include: {
					payments: true, // Include payments in the response
				},
			});
			return updatedPayment;
		} catch (e) {
			console.error(e);
			throw new Error("Failed to update professional payment");
		}
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		const deletedProfessionalPayment = await prisma.professionalPayment.delete({
			where: {
				id: id,
			},
		});
		return deletedProfessionalPayment;
	}
}
