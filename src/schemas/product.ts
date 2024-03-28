import z from "zod";

import { Prisma } from "@prisma/client";

const productSchema = z.object({
	name: z.string(),
	suggestedPrice: z.instanceof(Prisma.Decimal),
	categoryId: z.string().uuid(),
});

type ProductSchema = z.infer<typeof productSchema>;

export function validateProduct(input: ProductSchema) {
	return productSchema.safeParse(input);
}
export function validatePartialProduct(input: Partial<ProductSchema>) {
	return productSchema.partial().safeParse(input);
}

export type { ProductSchema };
