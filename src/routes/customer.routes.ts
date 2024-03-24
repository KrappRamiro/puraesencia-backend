import { Router } from "express";
import { CustomerController } from "../controllers/customer";

export const createCustomersRouter = () => {
	const customersRouter = Router();

	const customerController = new CustomerController();

	customersRouter.get("/", customerController.getAll);
	customersRouter.post("/", customerController.create);

	customersRouter.get("/:id", customerController.getByID);
	customersRouter.delete("/:id", customerController.delete);
	customersRouter.patch("/:id", customerController.update);

	return customersRouter;
};
