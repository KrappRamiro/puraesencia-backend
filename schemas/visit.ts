import z from "zod";

const visitSchema = z.object({
	customerId: z.string().uuid(),
	date: z.date(),
	
});

type visit = z.infer<typeof visitSchema>;

export function validateVisit(input: visit) {
	return visitSchema.safeParse(input);
}
export function validatePartialVisit(input: Partial<visit>) {
	return visitSchema.partial().safeParse(input);
}
