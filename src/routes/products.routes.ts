import { Router } from "express";
import { ProductController } from "../controllers/product";

export const createProductsRouter = () => {
	const productsRouter = Router();

	const productController = new ProductController();

	productsRouter.get("/", productController.getAll);
	productsRouter.post("/", productController.create);

	productsRouter.get("/:id", productController.getByID);
	productsRouter.delete("/:id", productController.delete);
	productsRouter.patch("/:id", productController.update);

	return productsRouter;
};
