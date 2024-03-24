import z from "zod";

const professionalSchema = z.object({
	name: z.string(),
	cuit: z.string(),
});

type Professional = z.infer<typeof professionalSchema>;

export function validateProfessional(input: Professional) {
	return professionalSchema.safeParse(input);
}
export function validatePartialProfessional(input: Partial<Professional>) {
	return professionalSchema.partial().safeParse(input);
}
