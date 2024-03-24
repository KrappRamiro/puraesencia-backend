import { Router } from "express";
import { ProfessionalController } from "../controllers/professional";
import { ProfessionalPaymentsController } from "../controllers/professionalPayment";

export const createProfessionalsRouter = () => {
	const professionalsRouter = Router();

	const professionalController = new ProfessionalController();
	const professionalPaymentsController = new ProfessionalPaymentsController();

	professionalsRouter.get("/", professionalController.getAll);
	professionalsRouter.post("/", professionalController.create);

	professionalsRouter.get("/:id", professionalController.getByID);
	professionalsRouter.delete("/:id", professionalController.delete);
	professionalsRouter.patch("/:id", professionalController.update);

	//payments
	professionalsRouter.get("/:id/payments/", professionalPaymentsController.getAll);
	professionalsRouter.post("/:id/payments/", professionalPaymentsController.create);

	professionalsRouter.get("/:id/payments/:paymentId", professionalPaymentsController.getByID);
	//professionalsRouter.delete("/:id/payments/:paymentId", professionalPaymentsController.delete);
	professionalsRouter.patch("/:id/payments/:paymentId", professionalPaymentsController.update);
	professionalsRouter.delete("/:id/payments/:paymentId", professionalPaymentsController.delete);

	return professionalsRouter;
};
