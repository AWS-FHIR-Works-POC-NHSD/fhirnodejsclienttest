const request = require("supertest");
const app = require("../../app");

describe("Testing the app responses", () => {

	describe("Test the root (/) route", () => {

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

		test("The hoorid text doesn't happen", async () => {
			const response = await request(app).get("/");
			expect(response.text).not.toMatch(/ is not defined/i);
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

	describe("Test the delete (/delete) route", () => {

		test("It should respond (200 OK) to the GET method", async () => {
			const response = await request(app).get("/delete");
			expect(response.statusCode).toBe(200);
		});


		test("It should respond (404 Not Found) to the POST method", async () => {
			const response = await request(app).post("/delete");
			expect(response.statusCode).toBe(404);
		});

		test("The response from the GET method should include the Page Title: <title>EJS demo app<", async () => {
			const response = await request(app).get("/delete");
			expect(response.text).toMatch(/<title>EJS demo app</i);
		});

		test("The response from the GET method should include the Page Heading: <H2>DELETE an existing vaccination record<", async () => {
			const response = await request(app).get("/delete");
			expect(response.text).toMatch(/<H2>DELETE an existing vaccination record</i);
		});

		test("The response from the GET method should NOT include the Page Heading: <h2>Patient page<", async () => {
			const response = await request(app).get("/delete");
			expect(response.text).not.toMatch(/<h2>Patient page</i);
		});

	});

	describe("Test the delete (/deletevacc!) route", () => {

		test("Contains the title: <title>EJS demo app<", async () => {
			const response = await request(app).get("/deletevacc?id=123");
			expect(response.text).toMatch(/<title>EJS demo app</i);
		});


		test("Contains the header: <H1>Vaccination event deleted<", async () => {
			const response = await request(app).get("/deletevacc?id=123");
			expect(response.text).toMatch(/<H1>Vaccination event deleted</i);
		});

		test("Contains the text: <p>unique FHIR resource ID: 3a2c0ffb-cbd0-46c0-b727-aae478af5a14", async () => {
			const response = await request(app).get("/deletevacc?id=3a2c0ffb-cbd0-46c0-b727-aae478af5a14");
			expect(response.text).toMatch(/<p>unique FHIR resource ID: 3a2c0ffb-cbd0-46c0-b727-aae478af5a14/i);
		});

	});

	describe("Test the get (/get) route", () => {

		test("Contains the title: <title>EJS demo app<", async () => {
			const response = await request(app).get("/get");
			expect(response.text).toMatch(/<title>EJS demo app</i);
		});


		test("Contains the header: <H2>View (GET) an existing vaccination record<", async () => {
			const response = await request(app).get("/get");
			expect(response.text).toMatch(/<H2>View \(GET\) an existing vaccination record/i);
			expect(response.text).toMatch(/<H2>Update \(PUT\) an existing vaccination record/i);
		});

	});



	describe("Test the get (/getpatient) route", () => {

		test("Contains the title: <title>EJS demo app<", async () => {
			const response = await request(app).get("/patientretrieve?id=9000000009&submit=");
			expect(response.text).toMatch(/<title>EJS demo app</i);
		});


		test("Contains the header: <H2>View (GET) an existing vaccination record<", async () => {
			const response = await request(app).get("/patientretrieve?id=9000000009&submit=");
			console.log(response.text);
			expect(response.text).toMatch(/Jane/i);
		});

	});


});