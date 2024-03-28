import z from "zod";

const customerSchema = z.object({
	name: z.string(),
	phoneNumber: z.string().nullable(),
	cuit: z.string().nullable(),
});

type CustomerSchema = z.infer<typeof customerSchema>;

export function validateCustomer(input: CustomerSchema) {
	return customerSchema.safeParse(input);
}
export function validatePartialCustomer(input: Partial<CustomerSchema>) {
	return customerSchema.partial().safeParse(input);
}

export type { CustomerSchema };
