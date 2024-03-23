import { Router } from "express";
import { CategoryController } from "../controllers/category";

export const createCategoriesRouter = () => {
	const categoriesRouter = Router();

	const categoryController = new CategoryController();

	categoriesRouter.get("/", categoryController.getAll);
	categoriesRouter.post("/", categoryController.create);

	categoriesRouter.get("/:id", categoryController.getByID);
	categoriesRouter.delete("/:id", categoryController.delete);
	categoriesRouter.patch("/:id", categoryController.update);

	return categoriesRouter;
};
