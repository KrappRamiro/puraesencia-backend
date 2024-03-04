import zod from "zod";

const professionalPaymentSchema = zod.object({
	name: zod.string(),
	amount: zod.number(),
	visitId: zod.string().uuid(),
	paymentMethodId: zod.string().uuid(),
});

type ProfessionalPayment = zod.infer<typeof professionalPaymentSchema>;

export function validateProfessionalPayment(input: ProfessionalPayment) {
	return professionalPaymentSchema.safeParse(input);
}
export function validatePartialProfessionalPayment(input: Partial<ProfessionalPayment>) {
	return professionalPaymentSchema.partial().safeParse(input);
}
