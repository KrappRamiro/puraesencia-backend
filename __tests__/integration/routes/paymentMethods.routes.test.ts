import request from "supertest";
import app from "../../../src/app";
import { validatePaymentMethod } from "../../../src/schemas/paymentMethod";
import { PaymentMethod } from "@prisma/client";
import { PaymentMethodSchema } from "../../../src/schemas/paymentMethod";
import { randomUUID } from "crypto";
const BASE_URL = "/paymentMethods";

let getRandomString = () => randomUUID().substring(0, 8);
let initializedElements: Array<PaymentMethod> = [];

async function initializeDatabase(numberOfElements: number) {
	for (let i = 0; i < numberOfElements; i++) {
		let paymentMethod: PaymentMethodSchema = {
			name: `random_${getRandomString()}`,
		};
		await request(app)
			.post(BASE_URL)
			.set("Accept", "application/json")
			.send(paymentMethod)
			.then((res) => {
				initializedElements.push(res.body);
			});
	}
}

async function teardownDatabase() {
	initializedElements.forEach(async (element) => {
		await request(app).delete(`${BASE_URL}/${element.id}`);
	});
}

describe("Payment method routes", () => {
	beforeAll(async () => {
		await initializeDatabase(5);
	});
	afterAll(async () => {
		await teardownDatabase();
	});

	describe("READ routes", () => {
		it("Should be able to get all payment methods, and they should be valid", async () => {
			const res = await request(app).get(BASE_URL);
			expect(res.status).toBe(200);
			// Assuming res.body is an array of payment method objects
			expect(res.body.every((paymentMethod: PaymentMethodSchema) => validatePaymentMethod(paymentMethod).success)).toBe(
				true
			);
		});

		it("Should be able to get an specific payment method with an specific id", async () => {
			const res = await request(app).get(`${BASE_URL}/${initializedElements[0].id}`);
			expect(res.status).toBe(200);
			expect(validatePaymentMethod(res.body).success).toBe(true);
		});
	});

	describe("CREATE routes", () => {
		it("Should be able to create a payment method", async () => {
			let randomName = getRandomString();
			const paymentMethod: PaymentMethodSchema = {
				name: `random_${randomName}`,
			};
			const createRes = await request(app)
				.post(BASE_URL)
				.set("Accept", "application/json")
				.send(paymentMethod)
				.expect("Content-Type", /json/)
				.expect(201);
			validatePaymentMethod(createRes.body);
		});
	});

	describe("DELETE routes", () => {
		it("Should be able to delete a payment method", async () => {
			await request(app).delete(`${BASE_URL}/${initializedElements[1].id}`).expect("Content-Type", /json/).expect(200);
		});
	});

	describe("UPDATE routes", () => {
		it("Should be able to update a payment method", async () => {
			const paymentMethodUpdate: Partial<PaymentMethodSchema> = {
				name: "TARJETA TODOPODEROSA!",
			};
			const updateRes = await request(app)
				.patch(`${BASE_URL}/${initializedElements[2].id}`)
				.set("Accept", "application/json")
				.send(paymentMethodUpdate)
				.expect("Content-Type", /json/)
				.expect(200);
			validatePaymentMethod(updateRes.body);
		});
	});
});
