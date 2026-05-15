const request = require("supertest");
const app = require("../app");

describe("Health endpoint", () => {
  it("returns backend health status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Backend is healthy");
  });
});
