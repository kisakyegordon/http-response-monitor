jest.mock("../db/httpResponseRepository", () => ({
  getHttpResponses: jest.fn()
}));

const request = require("supertest");
const app = require("../app");
const { getHttpResponses } = require("../db/httpResponseRepository");

describe("HTTP responses API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns historical HTTP responses", async () => {
    getHttpResponses.mockResolvedValue([
      {
        id: 1,
        status_code: 200,
        response_time_ms: 120,
        endpoint: "https://httpbin.org/anything",
        request_payload: { requestId: "test-id" },
        response_payload: { ok: true },
        created_at: new Date().toISOString()
      }
    ]);

    const response = await request(app).get("/api/responses");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.data[0].status_code).toBe(200);
  });

  it("returns 500 when fetching responses fails", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    getHttpResponses.mockRejectedValue(new Error("DB failed"));

    const response = await request(app).get("/api/responses");

    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to fetch HTTP responses");

    console.error.mockRestore();
  });
});