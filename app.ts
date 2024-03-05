// src/index.js
import express, { Express, json } from "express";
import dotenv from "./node_modules/dotenv/lib/main";
import { corsMiddleware } from "./middlewares/cors";
import { createCustomerRouter } from "./routes/customer";

dotenv.config();

const app: Express = express();
app.use(json());
app.use(corsMiddleware());

app.use("/customers", createCustomerRouter());

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
