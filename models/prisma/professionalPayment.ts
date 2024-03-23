//professional_Payment.ts
import { Professional_Payment, Professional_Payment_Subpayment } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

type Professional_Payment_SubpaymentInput = Omit<Professional_Payment_Subpayment, "id" | "parentPaymentId">;

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
				const newProfessionalPayment = await prisma.professional_Payment.create({
					data: {
						date: input.date,
						professional: {
							connect: {
								id: input.professionalId,
							},
						},
						subpayments: {
							create: input.subpayments.map((payment) => ({
								paymentMethod: {
									connect: { id: payment.paymentMethodId },
								},
								amount: payment.amount,
							})),
						},
					},
				});

				console.log("New professional payment created:", newProfessionalPayment);
				return newProfessionalPayment; // return the created Professional_Payment
			});
		} catch (e) {
			console.error(e);
			throw new Error(`Failed to create professional payment ${e}`);
		}
	}

	static async addSubpayment(input: { id: UUID; subpayment: Professional_Payment_SubpaymentInput }) {
		try {
			const existingPayment = await prisma.professional_Payment.findUnique({
				where: { id: input.id },
				include: { subpayments: true },
			});

			if (!existingPayment) {
				throw new Error("Professional Payment with ");
			}
		} catch (error) {}
	}

	static async update(
		id: UUID,
		input: { date?: Date; professionalId?: UUID; subpayments?: Array<Professional_Payment_Subpayment> }
	): Promise<Professional_Payment> {
		try {
			return await prisma.$transaction(async (prisma) => {
				// Update professional payment
				const updatedPayment = prisma.professional_Payment.update({
					where: { id: id },
					data: {
						date: input.date,
						professional: input.professionalId
							? {
									connect: {
										id: input.professionalId,
									},
							  }
							: undefined, // If professionalId is not provided, set it to undefined
						subpayments: input.subpayments
							? {
									updateMany: input.subpayments.map((subpayment) => ({
										where: { id: subpayment.id },
										data: subpayment,
									})),
							  }
							: undefined, // If subpayments is not provided, set it to undefined
					},
					include: {
						subpayments: true,
					},
				});
				return updatedPayment;
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
