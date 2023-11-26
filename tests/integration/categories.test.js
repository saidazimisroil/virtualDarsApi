// ishlamadi (X)
const request = require("supertest");
let server;
describe("/api/categories", () => {
    beforeEach(() => {
        server = require("../../index");
    });
    afterEach(() => {
        server.close();
    });

    describe("GET /", () => {
        it("should return all categories", async () => {
            const response = await request(server).get("/api/categories");
            expect(response.status).toBe(200);
        });
    });

    describe("GET /", () => {
        it("should return a category if given id is valid", async () => {
            // bu yerda MongoDb da 1 ta category insert qilinadi
            const category = { id: 1, name: "ai" };

            const response = await request(server).get(
                "api/categories/" + category.id
            );
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("name", "ai");
        });
    });
});
