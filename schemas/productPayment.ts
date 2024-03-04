import zod from "zod";

const productPaymentSchema = zod.object({
	name: zod.string(),
	amount: zod.number(),
	visitId: zod.string().uuid(),
	productId: zod.string().uuid(),
	paymentMethodId: zod.string().uuid(),
});

type productPayment = zod.infer<typeof productPaymentSchema>;

export function validateProductPayment(input: productPayment) {
	return productPaymentSchema.safeParse(input);
}
export function validatePartialProductPayment(input: Partial<productPayment>) {
	return productPaymentSchema.partial().safeParse(input);
}
