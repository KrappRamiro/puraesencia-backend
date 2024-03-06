import { Router } from "express";
import { CustomerController } from "../controllers/customer";

export const createCustomerRouter = () => {
	const customerRouter = Router();

	const customerController = new CustomerController();

	customerRouter.get("/", customerController.getAll);
	customerRouter.post("/", customerController.create);

	customerRouter.get("/:id", customerController.getByID);
	customerRouter.delete("/:id", customerController.delete);
	customerRouter.patch("/:id", customerController.update);

	return customerRouter;
};
