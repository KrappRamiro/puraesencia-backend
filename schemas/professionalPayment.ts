import zod from "zod";

const professionalPaymentSchema = zod.object({
	professionalId: zod.string().uuid(),
	date: zod.date(),
});

type ProfessionalPayment = zod.infer<typeof professionalPaymentSchema>;

export function validateProfessionalPayment(input: ProfessionalPayment) {
	return professionalPaymentSchema.safeParse(input);
}
export function validatePartialProfessionalPayment(input: Partial<ProfessionalPayment>) {
	return professionalPaymentSchema.partial().safeParse(input);
}
