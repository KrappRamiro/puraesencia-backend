import z from "zod";

import { Prisma } from "@prisma/client";

const productSchema = z.object({
	name: z.string(),
	suggestedPrice: z.instanceof(Prisma.Decimal),
	categoryId: z.string().uuid(),
});

type Product = z.infer<typeof productSchema>;

export function validateProduct(input: Product) {
	return productSchema.safeParse(input);
}
export function validatePartialProduct(input: Partial<Product>) {
	return productSchema.partial().safeParse(input);
}
