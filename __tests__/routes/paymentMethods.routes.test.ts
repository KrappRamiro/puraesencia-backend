import request from "supertest";
import app from "../../src/app";

describe("Payment method routes", () => {
	test("Add a payment method", async () => {
		const res = await request(app).get("/paymentMethods");
		expect(res.status).toBe(200);
	});
});
