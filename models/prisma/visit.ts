import prisma from "./client";
import { UUID } from "crypto";
import { Customer, Visit, Visit_Product_Payment, Visit_Product } from "@prisma/client";

type VisitInput = Omit<Visit, "id">;
type Visit_Product_PaymentInput = Omit<Visit_Product_Payment, "id">;

export class VisitModel {
	static async getAll(): Promise<Array<Visit>> {
		return await prisma.visit.findMany();
	}

	static async getByID(id: UUID): Promise<Visit | null> {
		return await prisma.visit.findUnique({
			where: {
				id: id,
			},
		});
	}

	static async create(input: {
		visitProducts: Visit_Product[];
		productPayments: Visit_Product_PaymentInput[];
		visit: VisitInput;
	}): Promise<Visit> {
		try {
			// The transaction API allows you to execute multiple operations as a single atomic operation
			// ensuring that either all operations succeed or none do, which is crucial for maintaining data integrity.
			//
			// if any operation within the transaction fails, Prisma will automatically roll back
			// all changes made during the transaction, ensuring that the data remains consistent
			return await prisma.$transaction(async (prisma) => {
				// Step 1: Create a new visit record
				const newVisit = await prisma.visit.create({
					data: {
						date: input.visit.date,
						customer: { connect: { id: input.visit.customerId } },
					},
				});

				// Step 2: Create records for the the products, and associate them with the new visit
				const productsData = input.visitProducts.map((product) => ({
					visitId: newVisit.id,
					productId: product.id,
				}));

				// Step 3: Create records for the the payments, and associate them with the new visit
				const paymentsData = input.productPayments.map((payment) => ({
					visitId: newVisit.id,
					amount: payment.amount,
					paymentMethodId: payment.paymentMethodId,
					visitProductId: payment.visitProductId,
				}));

				await prisma.visit_Product.createMany({ data: productsData });
				await prisma.visit_Product_Payment.createMany({ data: paymentsData });
				return newVisit;
			});
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to create professional payment ${error}`);
		}
	}
	static async update(
		id: UUID,
		input: {
			visitId: UUID;
			date?: Date;
			products?: Array<Visit_Product>;
			productPayments?: Array<Visit_Product_Payment>;
			customer?: Customer;
		}
	): Promise<Visit> {
		try {
			return await prisma.$transaction(async (prisma) => {
				// Update visit
				const visitUpdate = prisma.visit.update({
					where: { id: id },
					data: {
						date: input.date,
						customer: input.customer ? { connect: { id: input.customer.id } } : undefined,
					},
					include: {
						customer: true,
						payments: true,
						products: true,
					},
				});

				// Update products if provided
				const productUpdates = input.products
					? input.products.map((product) =>
							prisma.visit_Product.update({
								where: { id: product.id },
								data: {
									product: { connect: { id: product.productId } },
								},
							})
					  )
					: [];

				// Update payments if provided
				const paymentUpdates = input.productPayments
					? input.productPayments.map((payment) =>
							prisma.visit_Product_Payment.update({
								where: { id: payment.id },
								data: {
									amount: payment.amount,
									paymentMethod: { connect: { id: payment.paymentMethodId } },
									visitProduct: { connect: { id: payment.visitProductId } },
								},
							})
					  )
					: [];

				// Execute all updates in a transaction
				const [updatedVisit, ...rest] = await Promise.all([visitUpdate, ...productUpdates, ...paymentUpdates]);

				return updatedVisit;
			});
		} catch (error) {
			console.error(`Error updating visit: ${error}`);
			throw new Error(`Error updating visit: ${error}`);
		}
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		return await prisma.visit.delete({
			where: {
				id: id,
			},
		});
	}
}
