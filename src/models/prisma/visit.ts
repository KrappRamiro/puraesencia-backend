import prisma from "./client";
import { UUID } from "crypto";
import { Customer, Visit, Visit_Product_Payment, Visit_Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

type BaseVisitInput = Omit<Visit, "id">;

type VisitProductInput = {
	productId: UUID;
	payments: Array<Omit<Visit_Product_Payment, "visitId" | "visitProductId" | "id">>;
};
type CreateVisitInput = BaseVisitInput & { products: VisitProductInput[] };

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

	static async create(visit: CreateVisitInput): Promise<Visit> {
		try {
			return await prisma.$transaction(async (prisma) => {
				// Step 1: Create a new visit record
				const newVisit = await prisma.visit.create({
					data: {
						date: visit.date,
						customer: { connect: { id: visit.customerId } },
					},
				});

				// For each visitProduct, create a Visit_Product with its payments
				const createdProducts = await Promise.all(
					visit.products.map(async (product) => {
						// Create the Visit_Product record along with payments
						const newVisitProduct = await prisma.visit_Product.create({
							data: {
								visit: { connect: { id: newVisit.id } },
								product: { connect: { id: product.productId } },
								payments: {
									create: product.payments.map((payment) => ({
										paymentMethod: { connect: { id: payment.paymentMethodId } },
										amount: payment.amount,
										visit: { connect: { id: newVisit.id } },
									})),
								},
							},
							include: {
								payments: true,
							},
						});

						return newVisitProduct;
					})
				);
				console.log(`For new visit ${newVisit.id} created products ${createdProducts}`);

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
			date: Date;
			products: Array<Visit_Product>;
			productPayments: Array<Visit_Product_Payment>;
			customer: Customer;
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
