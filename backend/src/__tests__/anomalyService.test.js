const {
  calculateAverage,
  calculateStandardDeviation,
} = require("../services/anomalyService");

describe("Anomaly service", () => {
  it("calculates average correctly", () => {
    expect(calculateAverage([100, 200, 300])).toBe(200);
  });

  it("returns 0 average for empty input", () => {
    expect(calculateAverage([])).toBe(0);
  });

  it("calculates standard deviation", () => {
    const avg = calculateAverage([100, 200, 300]);
    const stdDev = calculateStandardDeviation([100, 200, 300], avg);

    expect(Math.round(stdDev)).toBe(82);
  });

  it("returns 0 standard deviation when fewer than 2 values", () => {
    expect(calculateStandardDeviation([100], 100)).toBe(0);
  });
});
