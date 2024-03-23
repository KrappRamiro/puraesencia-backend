// src/index.js
import express, { Express, json } from "express";
import dotenv from "./node_modules/dotenv/lib/main";
import { corsMiddleware } from "./middlewares/cors";
import { createCustomersRouter } from "./routes/customer";
import { createCategoriesRouter } from "./routes/categories";
import { createPaymentMethodsRouter } from "./routes/paymentMethods";
import { createProductsRouter } from "./routes/products";
import { createProfessionalsRouter } from "./routes/professionals";

dotenv.config();

const app: Express = express();
app.use(json());
app.use(corsMiddleware());

app.use("/categories", createCategoriesRouter());
app.use("/customers", createCustomersRouter());
app.use("/paymentMethods", createPaymentMethodsRouter());
app.use("/products", createProductsRouter());
app.use("/professionals", createProfessionalsRouter());

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
