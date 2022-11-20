const request = require("supertest");
const app = require("../../app");
process.env.AUTHENTICATE = false; //Doing this ensures that the routes can be accessed without authentication

describe("Testing the app responses", () => {

	describe("Test the HSTS behaviour", () => {

		test("If HSTS is disabled, there should be no header", async () => {
			process.env.HSTS = 'false';
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).toBeUndefined();
		});

		test("If HSTS is enabled, there should be a header", async () => {
			process.env.HSTS = 'true';
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).toBeDefined();
		});

		test("If HSTS is enabled and max-age unset, there should be a header with a default value", async () => {
			process.env.HSTS = 'true';
			process.env.HSTS_MAXAGES = undefined;
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).toContain('max-age=31536000');
		});

		test("If HSTS is enabled and max-age set, there should be a header with the specified value", async () => {
			process.env.HSTS = 'true';
			process.env.HSTS_MAXAGE = '5000';
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).toContain('max-age=5000');
		});

		test("If HSTS is enabled, max-age not set and Include Subdomains set, there should be a header including it", async () => {
			process.env.HSTS = 'true';
			process.env.HSTS_INCLUDESUBDOMS = 'true';
			process.env.HSTS_MAXAGE = undefined;
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).toContain('; includeSubDomains');
		});

		test("If HSTS is enabled,, max-age is set and Include Subdomains set, there should be a header including it", async () => {
			process.env.HSTS = 'true';
			process.env.HSTS_INCLUDESUBDOMS = 'true';
			process.env.HSTS_MAXAGE = '10000';
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).toContain('; includeSubDomains');
		});


		test("If HSTS is enabled, max-age is not set and Include Subdomains is not set, there should be a header without it", async () => {
			process.env.HSTS = 'true';
			process.env.HSTS_INCLUDESUBDOMS = 'false';
			process.env.HSTS_MAXAGE = undefined;
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).not.toContain('; includeSubDomains');
		});

		test("If HSTS is enabled, max age is set and Include Subdomains is not set, there should be a header without it", async () => {
			process.env.HSTS = 'true';
			process.env.HSTS_INCLUDESUBDOMS = 'false';
			process.env.HSTS_MAXAGE = '5000';
			const response = await request(app).get("/");
			expect(response.headers['strict-transport-security']).not.toContain('; includeSubDomains');
		});


	});

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