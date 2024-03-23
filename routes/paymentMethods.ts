import { Router } from "express";
import { PaymentMethodController } from "../controllers/paymentMethod";

export const createPaymentMethodsRouter = () => {
	const paymentMethodsRouter = Router();

	const paymentMethodController = new PaymentMethodController();

	paymentMethodsRouter.get("/", paymentMethodController.getAll);
	paymentMethodsRouter.post("/", paymentMethodController.create);

	paymentMethodsRouter.get("/:id", paymentMethodController.getByID);
	paymentMethodsRouter.delete("/:id", paymentMethodController.delete);
	paymentMethodsRouter.patch("/:id", paymentMethodController.update);

	return paymentMethodsRouter;
};
