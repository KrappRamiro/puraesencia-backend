import zod from "zod";

const professionalSchema = zod.object({
	name: zod.string(),
	cuit: zod.string(),
});

type Professional = zod.infer<typeof professionalSchema>;

export function validateProfessional(input: Professional) {
	return professionalSchema.safeParse(input);
}
export function validatePartialProfessional(input: Partial<Professional>) {
	return professionalSchema.partial().safeParse(input);
}
