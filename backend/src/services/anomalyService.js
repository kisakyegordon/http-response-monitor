const { getRecentResponseTimes } = require("../db/httpResponseRepository");

function calculateAverage(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function calculateStandardDeviation(values, average) {
  if (values.length < 2) return 0;

  const variance =
    values.reduce((sum, value) => sum + Math.pow(value - average, 2), 0) /
    values.length;

  return Math.sqrt(variance);
}

async function detectAnomaly(responseTimeMs) {
  const recentTimes = await getRecentResponseTimes(25);

  if (recentTimes.length < 5) {
    return {
      isAnomaly: false,
      anomalyReason: null
    };
  }

  const average = calculateAverage(recentTimes);
  const stdDev = calculateStandardDeviation(recentTimes, average);
  const threshold = average + 2 * stdDev;

  if (responseTimeMs > threshold) {
    return {
      isAnomaly: true,
      anomalyReason: `Response time ${responseTimeMs}ms exceeded threshold ${Math.round(
        threshold
      )}ms`
    };
  }

  return {
    isAnomaly: false,
    anomalyReason: null
  };
}

module.exports = {
  detectAnomaly,
  calculateAverage,
  calculateStandardDeviation
};