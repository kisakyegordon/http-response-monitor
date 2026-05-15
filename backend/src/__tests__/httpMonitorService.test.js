jest.mock("axios");

jest.mock("../db/httpResponseRepository", () => ({
  saveHttpResponse: jest.fn(),
  getResponseTimesFromLast24Hours: jest.fn().mockResolvedValue([]),
}));

const axios = require("axios");
const {
  saveHttpResponse,
  getResponseTimesFromLast24Hours,
} = require("../db/httpResponseRepository");
const { pingHttpBin } = require("../services/httpMonitorService");

describe("HTTP monitor service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.HTTPBIN_URL = "https://httpbin.org/anything";
    getResponseTimesFromLast24Hours.mockResolvedValue([]);
  });

  it("pings HTTPBin and saves successful response", async () => {
    axios.post.mockResolvedValue({
      status: 200,
      data: { ok: true },
    });

    saveHttpResponse.mockResolvedValue({
      id: 1,
      status_code: 200,
    });

    const result = await pingHttpBin();

    expect(axios.post).toHaveBeenCalledWith(
      "https://httpbin.org/anything",
      expect.objectContaining({
        source: "http-response-monitor",
      })
    );

    expect(saveHttpResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 200,
        responsePayload: { ok: true },
        endpoint: "https://httpbin.org/anything",
        isAnomaly: false,
      })
    );

    expect(result.id).toBe(1);
  });

  it("saves failed HTTPBin response", async () => {
    axios.post.mockRejectedValue(new Error("Network failed"));

    saveHttpResponse.mockResolvedValue({
      id: 2,
      status_code: 500,
    });

    const result = await pingHttpBin();

    expect(saveHttpResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        responsePayload: expect.objectContaining({
          message: "Network failed",
        }),
        isAnomaly: false,
      })
    );

    expect(result.id).toBe(2);
  });
});