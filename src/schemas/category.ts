import z from "zod";

const categorySchema = z.object({
	name: z.string(),
});

type CategorySchema = z.infer<typeof categorySchema>;

export function validateCategory(input: CategorySchema) {
	return categorySchema.safeParse(input);
}
export function validatePartialCategory(input: Partial<CategorySchema>) {
	return categorySchema.partial().safeParse(input);
}
export type { CategorySchema };
