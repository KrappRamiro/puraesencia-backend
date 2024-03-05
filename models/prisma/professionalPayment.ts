//professional_Payment.ts
import { Prisma, Professional_Payment, Professional_Payment_Subpayment } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

type Professional_Payment_SubpaymentInput = Omit<Professional_Payment_Subpayment, "id">;

export class ProfessionalPaymentModel {
	static async getAll(): Promise<Array<Professional_Payment>> {
		return await prisma.professional_Payment.findMany();
	}

	static async getByID(id: UUID): Promise<Professional_Payment | null> {
		return await prisma.professional_Payment.findUnique({
			where: {
				id: id,
			},
		});
	}
	static async create(input: {
		date: Date;
		professionalId: UUID;
		subpayments: Array<Professional_Payment_SubpaymentInput>;
	}): Promise<Professional_Payment> {
		try {
			// The transaction API allows you to execute multiple operations as a single atomic operation
			// ensuring that either all operations succeed or none do, which is crucial for maintaining data integrity.
			//
			// if any operation within the transaction fails, Prisma will automatically roll back
			// all changes made during the transaction, ensuring that the data remains consistent
			return await prisma.$transaction(async (prisma) => {
				// Step 1: Create a new Professional_Payment record
				const newProfessionalPayment = await prisma.professional_Payment.create({
					data: {
						date: input.date,
						professional: {
							connect: {
								id: input.professionalId,
							},
						},
					},
				});

				// Step 2: Create records for Professional_Payment_Subpayment and associate them with the new Professional_Payment
				const createdSubpayments = await Promise.all(
					input.subpayments.map(async (payment) => {
						return prisma.professional_Payment_Subpayment.create({
							data: {
								parentPayment: {
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
				console.log("Associated subpayments:", createdSubpayments);
				return newProfessionalPayment; // return the created Professional_Payment
			});
		} catch (e) {
			console.error(e);
			throw new Error(`Failed to create professional payment ${e}`);
		}
	}

	static async update(
		id: UUID,
		input: { date?: Date; professionalId: UUID; payments: Array<Professional_Payment_SubpaymentInput> }
	): Promise<Professional_Payment> {
		try {
			return await prisma.$transaction(async (prisma) => {
				// Update professional payment
				const professionalPaymentUpdate = prisma.professional_Payment.update({
					where: { id: id },
					data: {
						date: input.date,
						professional: {
							connect: {
								id: input.professionalId,
							},
						},
					},
					include: {
						subpayments: true,
					},
				});

				const paymentMethodsUpdate = input.payments?.map((payment) => {
					prisma.professional_Payment_Subpayment.update({
						where: {
							id: payment.parentPaymentId,
						},
						data: {
							amount: payment.amount,
							paymentMethod: { connect: { id: id } },
						},
					});
				});

				const [updatedProfessionalPayment, ...rest] = await Promise.all([
					professionalPaymentUpdate,
					...paymentMethodsUpdate,
				]);

				return updatedProfessionalPayment;
			});
		} catch (e) {
			console.error(e);
			throw new Error("Failed to update professional payment");
		}
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		return await prisma.professional_Payment.delete({
			where: {
				id: id,
			},
		});
	}
}
