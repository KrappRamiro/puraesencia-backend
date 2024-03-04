import zod from "zod";

const productSchema = zod.object({
	name: zod.string(),
	suggestedPrice: zod.number(),
	categoryId: zod.string().uuid(),
});

type Product = zod.infer<typeof productSchema>;

export function validateProduct(input: Product) {
	return productSchema.safeParse(input);
}
export function validatePartialProduct(input: Partial<Product>) {
	return productSchema.partial().safeParse(input);
}
