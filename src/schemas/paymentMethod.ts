import z from "zod";

const paymentMethodSchema = z.object({
	name: z.string(),
});

type PaymentMethod = z.infer<typeof paymentMethodSchema>;

export function validatePaymentMethod(input: PaymentMethod) {
	return paymentMethodSchema.safeParse(input);
}
export function validatePartialPaymentMethod(input: Partial<PaymentMethod>) {
	return paymentMethodSchema.partial().safeParse(input);
}
