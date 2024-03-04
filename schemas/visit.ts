import zod from "zod";

const visitSchema = zod.object({
	customerId: zod.string().uuid(),
	date: zod.date(),
});

type visit = zod.infer<typeof visitSchema>;

export function validateVisit(input: visit) {
	return visitSchema.safeParse(input);
}
export function validatePartialVisit(input: Partial<visit>) {
	return visitSchema.partial().safeParse(input);
}
