import z from "zod";

const categorySchema = z.object({
	name: z.string(),
});

type Category = z.infer<typeof categorySchema>;

export function validateCategory(input: Category) {
	return categorySchema.safeParse(input);
}
export function validatePartialCategory(input: Partial<Category>) {
	return categorySchema.partial().safeParse(input);
}
