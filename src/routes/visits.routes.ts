/**
import { Router } from "express";
import { VisitController } from "../controllers/visit";

export const createVisitsRouter = () => {
	const visitsRouter = Router();

	const visitController = new VisitController();

	visitsRouter.get("/", visitController.getAll);
	visitsRouter.post("/", visitController.create);

	visitsRouter.get("/:id", visitController.getByID);
	visitsRouter.delete("/:id", visitController.delete);
	visitsRouter.patch("/:id", visitController.update);

	return visitsRouter;
};

 *
 */
