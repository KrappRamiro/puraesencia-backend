import zod from "zod";

const categorySchema = zod.object({
	name: zod.string(),
});

type Category = zod.infer<typeof categorySchema>;

export function validateCategory(input: Category) {
	return categorySchema.safeParse(input);
}
export function validatePartialCategory(input: Partial<Category>) {
	return categorySchema.partial().safeParse(input);
}
