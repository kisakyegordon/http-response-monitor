jest.mock("axios");
jest.mock("../db/httpResponseRepository", () => ({
  saveHttpResponse: jest.fn(),
  getRecentResponseTimes: jest.fn().mockResolvedValue([]),
}));

const axios = require("axios");
const { saveHttpResponse } = require("../db/httpResponseRepository");
const { pingHttpBin } = require("../services/httpMonitorService");

describe("HTTP monitor service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.HTTPBIN_URL = "https://httpbin.org/anything";
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

    expect(axios.post).toHaveBeenCalled();
    expect(saveHttpResponse).toHaveBeenCalled();
    expect(result.id).toBe(1);
  });

  it("saves failed HTTPBin response", async () => {
    axios.post.mockRejectedValue(new Error("Network failed"));

    saveHttpResponse.mockResolvedValue({
      id: 2,
      status_code: 500,
    });

    const result = await pingHttpBin();

    expect(saveHttpResponse).toHaveBeenCalled();
    expect(result.id).toBe(2);
  });
});
