import prisma from "./client";
import { UUID } from "crypto";
import { Customer, Service, Visit, Visit_Payments, Visit_Services } from "@prisma/client";

export class VisitModel {
	static async getAll(): Promise<Array<Visit>> {
		return await prisma.visit.findMany();
	}

	static async getById(id: UUID): Promise<Visit> {
		return await prisma.visit.findUniqueOrThrow({
			where: {
				id: id,
			},
		});
	}

	static async create(input: {
		visitServices: Visit_Services[];
		visitPayments: Visit_Payments[];
		customerId: UUID;
		date: Date;
	}): Promise<Visit> {
		try {
			// Step 1: Create a new visit record
			const newVisit = await prisma.visit.create({
				data: {
					date: input.date,
					customer: { connect: { id: input.customerId } },
				},
			});

			// Step 2: Create records for the the services, and associate them with the new visit
			const servicesData = input.visitServices.map((service) => ({
				visitId: newVisit.id, // Assuming newVisit.id is of type string
				serviceId: service.id,
			}));
			const createdServices = await prisma.visit_Services.createMany({ data: servicesData });

			// Step 3: Create records for the the payments, and associate them with the new visit
			const paymentsData = input.visitPayments.map((payment) => ({
				visitId: newVisit.id, // Assuming newVisit.id is of type string
				paymentMethodId: payment.paymentMethodId,
				amount: payment.amount,
			}));
			const createdPayments = await prisma.visit_Payments.createMany({ data: paymentsData });
			////////
			return newVisit;
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
			services?: Array<Visit_Services>;
			visitPayments?: Array<Visit_Payments>;
			customer?: Customer;
		}
	): Promise<Visit> {
		try {
			if (input.services) {
				const updatedServices = await Promise.all(
					input.services.map(async (service) => {
						await prisma.visit_Services.update({
							where: {
								id: service.id,
							},
							data: {
								service: {
									connect: {
										id: service.serviceId,
									},
								},
							},
						});
					})
				);
			}

			if (input.visitPayments) {
				const updatedServices = await Promise.all(
					input.visitPayments.map(async (payment) => {
						await prisma.visit_Payments.update({
							where: {
								id: payment.id,
							},
							data: {
								paymentMethod: {
									connect: {
										id: payment.paymentMethodId,
									},
								},
								amount: payment.amount,
							},
						});
					})
				);
			}

			const updatedVisit = await prisma.visit.update({
				where: { id: id },
				data: {
					date: input.date,
					customer: {
						connect: {
							id: input.customer?.id,
						},
					},
				},
				include: {
					customer: true,
					payments: true,
					services: true,
				},
			});

			return updatedVisit;
		} catch (error) {
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
