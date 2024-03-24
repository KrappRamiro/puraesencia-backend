import z from "zod";
import { Prisma } from "@prisma/client";

const productPaymentSchema = z.object({
	name: z.string(),
	amount: z.instanceof(Prisma.Decimal),
	visitId: z.string().uuid(),
	productId: z.string().uuid(),
	paymentMethodId: z.string().uuid(),
});

type productPayment = z.infer<typeof productPaymentSchema>;

export function validateProductPayment(input: productPayment) {
	return productPaymentSchema.safeParse(input);
}
export function validatePartialProductPayment(input: Partial<productPayment>) {
	return productPaymentSchema.partial().safeParse(input);
}
