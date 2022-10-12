const request = require("supertest");
const app = require("../../app");
const axios = require('axios');
process.env.AUTHENTICATE = false; //Doing this ensures that the routes can be accessed without authentication

jest.mock("axios");

describe("Testing the app responses with Axios mocked", () => {

	describe("Test the delete (/deletevacc!) route", () => {

		test("Contains the title: <title>EJS demo app<", async () => {

			// Here's what will happen when we call axios.delete
			axios.delete.mockResolvedValueOnce({});
			const response = await request(app).get("/deletevacc?id=123");
			expect(response.text).toMatch(/<title>EJS demo app</i);
		});


		test("Contains the header: <H1>Vaccination event deleted<", async () => {

			// Here's what will happen when we call axios.delete
			axios.delete.mockResolvedValueOnce({});
			const response = await request(app).get("/deletevacc?id=123");
			expect(response.text).toMatch(/<H1>Vaccination event deleted</i);
		});

		test("(MOCKED) Contains the text: <p>unique FHIR resource ID: 3a2c0ffb-cbd0-46c0-b727-aae478af5a14", async () => {

			// Here's what will happen when we call axios.delete
			axios.delete.mockResolvedValueOnce({});
			const response = await request(app).get("/deletevacc?id=3a2c0ffb-cbd0-46c0-b727-aae478af5a14");
			expect(response.text).toMatch(/<p>unique FHIR resource ID: 3a2c0ffb-cbd0-46c0-b727-aae478af5a14/i);
		});

	});

});