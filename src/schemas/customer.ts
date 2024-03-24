import z from "zod";

const customerSchema = z.object({
	name: z.string(),
	phoneNumber: z.string().nullable(),
	cuit: z.string().nullable(),
});

type Customer = z.infer<typeof customerSchema>;

export function validateCustomer(input: Customer) {
	return customerSchema.safeParse(input);
}
export function validatePartialCustomer(input: Partial<Customer>) {
	return customerSchema.partial().safeParse(input);
}
