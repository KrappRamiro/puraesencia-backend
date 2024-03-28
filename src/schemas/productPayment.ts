import z from "zod";
import { Prisma } from "@prisma/client";

const productPaymentSchema = z.object({
	name: z.string(),
	amount: z.instanceof(Prisma.Decimal),
	visitId: z.string().uuid(),
	productId: z.string().uuid(),
	paymentMethodId: z.string().uuid(),
});

type ProductPaymentSchema = z.infer<typeof productPaymentSchema>;

export function validateProductPayment(input: ProductPaymentSchema) {
	return productPaymentSchema.safeParse(input);
}
export function validatePartialProductPayment(input: Partial<ProductPaymentSchema>) {
	return productPaymentSchema.partial().safeParse(input);
}
export type { ProductPaymentSchema };
