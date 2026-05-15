const axios = require("axios");
const generatePayload = require("../utils/generatePayload");
const { saveHttpResponse } = require("../db/httpResponseRepository");

async function pingHttpBin() {
  const endpoint = process.env.HTTPBIN_URL;
  const requestPayload = generatePayload();

  const start = Date.now();

  try {
    const response = await axios.post(endpoint, requestPayload);
    const responseTimeMs = Date.now() - start;

    const savedRecord = await saveHttpResponse({
      requestPayload,
      responsePayload: response.data,
      statusCode: response.status,
      responseTimeMs,
      endpoint,
    });

    return savedRecord;
  } catch (error) {
    const responseTimeMs = Date.now() - start;

    const savedErrorRecord = await saveHttpResponse({
      requestPayload,
      responsePayload: {
        message: error.message,
        code: error.code || null,
      },
      statusCode: error.response?.status || 500,
      responseTimeMs,
      endpoint,
    });

    return savedErrorRecord;
  }
}

module.exports = {
  pingHttpBin,
};
