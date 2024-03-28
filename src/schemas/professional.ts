import z from "zod";

const professionalSchema = z.object({
	name: z.string(),
	cuit: z.string(),
});

type ProfessionalSchema = z.infer<typeof professionalSchema>;

export function validateProfessional(input: ProfessionalSchema) {
	return professionalSchema.safeParse(input);
}
export function validatePartialProfessional(input: Partial<ProfessionalSchema>) {
	return professionalSchema.partial().safeParse(input);
}
export type { ProfessionalSchema };
