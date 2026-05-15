const generatePayload = require("../utils/generatePayload");

describe("generatePayload", () => {
  it("generates a valid random payload", () => {
    const payload = generatePayload();

    expect(payload).toHaveProperty("requestId");
    expect(payload).toHaveProperty("source", "http-response-monitor");
    expect(payload).toHaveProperty("timestamp");
    expect(payload).toHaveProperty("metadata.randomValue");

    expect(typeof payload.requestId).toBe("string");
    expect(typeof payload.metadata.randomValue).toBe("number");
  });
});
