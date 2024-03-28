import z from "zod";

const paymentMethodSchema = z.object({
	name: z.string(),
});

type PaymentMethodSchema = z.infer<typeof paymentMethodSchema>;

export function validatePaymentMethod(input: PaymentMethodSchema) {
	return paymentMethodSchema.safeParse(input);
}
export function validatePartialPaymentMethod(input: Partial<PaymentMethodSchema>) {
	return paymentMethodSchema.partial().safeParse(input);
}

export function validateStrictPaymentMethod(input: PaymentMethodSchema) {
	return paymentMethodSchema.strict().safeParse(input);
}

export type { PaymentMethodSchema };
