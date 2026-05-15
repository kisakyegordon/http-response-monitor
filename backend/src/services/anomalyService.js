const { getResponseTimesFromLast24Hours } = require("../db/httpResponseRepository");

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

function predictNextResponseTime(values) {
  if (!values.length) return null;

  const recentValues = values.slice(-5);
  return Math.round(calculateAverage(recentValues));
}

async function detectAnomaly(responseTimeMs) {
  const recentTimes = await getResponseTimesFromLast24Hours();

  if (recentTimes.length < 5) {
    return {
      isAnomaly: false,
      anomalyReason: null,
      rollingMeanMs: null,
      rollingStdDevMs: null,
      predictedResponseTimeMs: predictNextResponseTime(recentTimes),
      upperBoundMs: null,
      lowerBoundMs: null
    };
  }

  const mean = calculateAverage(recentTimes);
  const stdDev = calculateStandardDeviation(recentTimes, mean);

  const upperBound = mean + 2 * stdDev;
  const lowerBound = Math.max(0, mean - 2 * stdDev);
  const predicted = predictNextResponseTime(recentTimes);

  const isAnomaly = responseTimeMs > upperBound;

  return {
    isAnomaly,
    anomalyReason: isAnomaly
      ? `Response time ${responseTimeMs}ms exceeded upper bound ${Math.round(
          upperBound
        )}ms`
      : null,
    rollingMeanMs: Math.round(mean),
    rollingStdDevMs: Math.round(stdDev),
    predictedResponseTimeMs: predicted,
    upperBoundMs: Math.round(upperBound),
    lowerBoundMs: Math.round(lowerBound)
  };
}

module.exports = {
  detectAnomaly,
  calculateAverage,
  calculateStandardDeviation,
  predictNextResponseTime
};