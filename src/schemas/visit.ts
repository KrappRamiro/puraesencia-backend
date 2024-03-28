import z from "zod";

const visitSchema = z.object({
	customerId: z.string().uuid(),
	date: z.date(),
});

type VisitSchema = z.infer<typeof visitSchema>;

export function validateVisit(input: VisitSchema) {
	return visitSchema.safeParse(input);
}
export function validatePartialVisit(input: Partial<VisitSchema>) {
	return visitSchema.partial().safeParse(input);
}
export type { VisitSchema };
