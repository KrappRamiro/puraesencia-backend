//customer.ts
import { Customer } from "@prisma/client";
import prisma from "./client";
import { UUID } from "crypto";

type CustomerInput = Omit<Customer, "id">;

export class CustomerModel {
	static async getAll(): Promise<Array<Customer>> {
		return await prisma.customer.findMany();
	}

	static async getByID(id: UUID): Promise<Customer | null> {
		const customer = await prisma.customer.findUnique({
			where: {
				id: id,
			},
		});

		return customer;
	}

	static async create(customer: CustomerInput): Promise<Customer> {
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
