import zod from "zod";

const paymentMethodSchema = zod.object({
	name: zod.string(),
});

type PaymentMethod = zod.infer<typeof paymentMethodSchema>;

export function validatePaymentMethod(input: PaymentMethod) {
	return paymentMethodSchema.safeParse(input);
}
export function validatePartialPaymentMethod(input: Partial<PaymentMethod>) {
	return paymentMethodSchema.partial().safeParse(input);
}
