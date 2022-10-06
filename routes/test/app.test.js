const request = require("supertest");
const app = require("../../app");


describe("Testing the app responses", () => {

	describe("Test the root (/) path", () => {

		test("It should respond (200 OK) to the GET method", async () => {
			const response = await request(app).get("/");
			expect(response.statusCode).toBe(200);
		});


		test("It should respond (404 Not Found) to the POST method", async () => {
			const response = await request(app).post("/");
			expect(response.statusCode).toBe(404);
		});

		test("The response from the GET method should include the Page Title: <title>EJS demo app<", async () => {
			const response = await request(app).get("/");
			expect(response.text).toMatch(/<title>EJS demo app</i);
		});

		test("The response from the GET method should include the Page Heading: <H2>Home page<", async () => {
			const response = await request(app).get("/");
			expect(response.text).toMatch(/<H2>Home page</i);
		});

		test("The response from the GET method should NOT include the Page Heading: <h2>Patient page<", async () => {
			const response = await request(app).get("/");
			expect(response.text).not.toMatch(/<h2>Patient page</i);
		});

	});

});