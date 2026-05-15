const axios = require("axios");
const generatePayload = require("../utils/generatePayload");
const { saveHttpResponse } = require("../db/httpResponseRepository");
const { detectAnomaly } = require("./anomalyService");

async function pingHttpBin() {
  const endpoint = process.env.HTTPBIN_URL;
  const requestPayload = generatePayload();

  const start = Date.now();

  try {
    const response = await axios.post(endpoint, requestPayload);
    const responseTimeMs = Date.now() - start;
    const anomalyResult = await detectAnomaly(responseTimeMs);

    const savedRecord = await saveHttpResponse({
      requestPayload,
      responsePayload: response.data,
      statusCode: response.status,
      responseTimeMs,
      endpoint,
      isAnomaly: anomalyResult.isAnomaly,
      anomalyReason: anomalyResult.anomalyReason,
      rollingMeanMs: anomalyResult.rollingMeanMs,
      rollingStdDevMs: anomalyResult.rollingStdDevMs,
      predictedResponseTimeMs: anomalyResult.predictedResponseTimeMs,
      upperBoundMs: anomalyResult.upperBoundMs,
      lowerBoundMs: anomalyResult.lowerBoundMs,
    });

    return savedRecord;
  } catch (error) {
    const responseTimeMs = Date.now() - start;
    const anomalyResult = await detectAnomaly(responseTimeMs);

    const savedErrorRecord = await saveHttpResponse({
      requestPayload,
      responsePayload: {
        message: error.message,
        code: error.code || null,
      },
      statusCode: error.response?.status || 500,
      responseTimeMs,
      endpoint,
      isAnomaly: anomalyResult.isAnomaly,
      anomalyReason: anomalyResult.anomalyReason,
      rollingMeanMs: anomalyResult.rollingMeanMs,
      rollingStdDevMs: anomalyResult.rollingStdDevMs,
      predictedResponseTimeMs: anomalyResult.predictedResponseTimeMs,
      upperBoundMs: anomalyResult.upperBoundMs,
      lowerBoundMs: anomalyResult.lowerBoundMs,
    });

    return savedErrorRecord;
  }
}

module.exports = {
  pingHttpBin,
};
