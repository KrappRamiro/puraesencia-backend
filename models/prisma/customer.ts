//customer.ts
import { Customer } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

export class CustomerModel {
	static async getAll(): Promise<Array<Customer>> {
		return await prisma.customer.findMany();
	}

	static async getByID(id: UUID): Promise<Customer> {
		const customer = await prisma.customer.findUnique({
			where: {
				id: id,
			},
		});
		if (customer === null) {
			throw new Error(`Customer with id: ${id} not found`);
		}
		return customer;
	}

	static async create(customer: Customer): Promise<Customer> {
		const createdCustomer = await prisma.customer.create({ data: customer });
		return createdCustomer;
	}

	static async update({ id, customer }: { id: UUID; customer: Partial<Customer> }): Promise<Customer> {
		const updatedCustomer = await prisma.customer.update({
			where: {
				id: id,
			},
			data: customer,
		});
		return updatedCustomer;
	}

	static async delete(id: UUID): Promise<{ id: string }> {
		const deletedCustomer = await prisma.customer.delete({
			where: {
				id: id,
			},
		});
		return deletedCustomer;
	}
}
