import zod from "zod";

const professionalSubpaymentSchema = zod.object({
	amount: zod.number(),
	paymentMethodId: zod.string().uuid(),
});

type ProfessionalSubpayment = zod.infer<typeof professionalSubpaymentSchema>;

export function validateProfessionalSubpayment(input: ProfessionalSubpayment) {
	return professionalSubpaymentSchema.safeParse(input);
}
export function validatePartialProfessionalSubpayment(input: Partial<ProfessionalSubpayment>) {
	return professionalSubpaymentSchema.partial().safeParse(input);
}
