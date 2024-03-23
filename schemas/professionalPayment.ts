import z from "zod";
import { Prisma } from "@prisma/client";

const professionalPaymentSchema = z.object({
	professionalId: z.string().uuid(),
	date: z.date(),
	subpayments: z.array(
		z.object({
			amount: z.instanceof(Prisma.Decimal),
			parentPaymentId: z.string().uuid(),
			paymentMethodId: z.string().uuid(),
		})
	),
});

type ProfessionalPayment = z.infer<typeof professionalPaymentSchema>;

export function validateProfessionalPayment(input: ProfessionalPayment) {
	return professionalPaymentSchema.safeParse(input);
}
export function validatePartialProfessionalPayment(input: Partial<ProfessionalPayment>) {
	return professionalPaymentSchema.partial().safeParse(input);
}
