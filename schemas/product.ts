import zod from "zod";

import { Prisma } from "@prisma/client";

const productSchema = zod.object({
	name: zod.string(),
	suggestedPrice: zod.instanceof(Prisma.Decimal),
	categoryId: zod.string().uuid(),
});

type Product = zod.infer<typeof productSchema>;

export function validateProduct(input: Product) {
	return productSchema.safeParse(input);
}
export function validatePartialProduct(input: Partial<Product>) {
	return productSchema.partial().safeParse(input);
}
