import { Prisma } from "@prisma/client";
import zod from "zod";

const professionalSubpaymentSchema = zod.object({
	amount: zod.instanceof(Prisma.Decimal),
	parentPaymentId: zod.string().uuid(),
	paymentMethodId: zod.string().uuid(),
});

type ProfessionalSubpayment = zod.infer<typeof professionalSubpaymentSchema>;

export function validateProfessionalSubpayment(input: ProfessionalSubpayment) {
	return professionalSubpaymentSchema.safeParse(input);
}
export function validatePartialProfessionalSubpayment(input: Partial<ProfessionalSubpayment>) {
	return professionalSubpaymentSchema.partial().safeParse(input);
}
