import zod from "zod";

const customerSchema = zod.object({
	name: zod.string(),
	telefono: zod.string().optional(),
	cuit: zod.string().optional(),
});

type Customer = zod.infer<typeof customerSchema>;

export function validateCustomer(input: Customer) {
	return customerSchema.safeParse(input);
}
export function validatePartialCustomer(input: Partial<Customer>) {
	return customerSchema.partial().safeParse(input);
}
