// src/index.js
import express, { Express, json } from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./middlewares/cors";
import { createCustomersRouter } from "./routes/customer.routes";
import { createCategoriesRouter } from "./routes/categories.routes";
import { createPaymentMethodsRouter } from "./routes/paymentMethods.routes";
import { createProductsRouter } from "./routes/products.routes";
import { createProfessionalsRouter } from "./routes/professionals.routes";
import { Request, Response } from "express";

dotenv.config();

const app: Express = express();
app.use(json());
app.use(corsMiddleware());

app.use("/categories", createCategoriesRouter());
app.use("/customers", createCustomersRouter());
app.use("/paymentMethods", createPaymentMethodsRouter());
app.use("/products", createProductsRouter());
app.use("/professionals", createProfessionalsRouter());

app.use("/", (req: Request, res: Response): void => {
	res.json({ message: "Hello world!" });
});

export default app;
