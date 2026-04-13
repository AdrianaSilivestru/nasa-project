const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
    beforeAll(async () => {
        await mongoConnect();
    });
    afterAll(async () => {
        await mongoDisconnect();
    });

    describe("Test GET /v1/launches", () => {
        it("Should respond with 200 success", async () => {
            const response = await request(app)
                .get("/v1/launches")
                .expect("Content-Type", /json/)
                .expect(200);
        });
    });

    describe("Test POST /v1/launches", () => {
        const completeLaunchData = {
            mission: "test",
            rocket: "123A",
            target: "Kepler-1652 b",
            launchDate: "January 4, 2028"
        };
        const launchDataWithoutDate = {
            mission: "test",
            rocket: "123A",
            target: "Kepler-1652 b"
        };

        const launchDataWithInvalidDate = {
            mission: "test",
            rocket: "123A",
            target: "Kepler-1652 b",
            launchDate: "zzz"
        };

        it("Should respond with 201 created", async () => {
            const response = await request(app)
                .post("/v1/launches")
                .send(completeLaunchData)
                .expect(201)
                .expect("Content-type", /json/);

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();

            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });

        it("Should catch missing required properties", async () => {
            const response = await request(app)
                .post("/v1/launches")
                .send(launchDataWithoutDate)
                .expect(400)
                .expect("Content-type", /json/);

            expect(response.body).toStrictEqual({
                error: "Missing required launch property"
            });
        });

        it("Should catch invalid dates", async () => {
            const response = await request(app)
                .post("/v1/launches")
                .send(launchDataWithInvalidDate)
                .expect(400)
                .expect("Content-type", /json/);

            expect(response.body).toStrictEqual({
                error: "Invalid launch date"
            });
        });
    });
});