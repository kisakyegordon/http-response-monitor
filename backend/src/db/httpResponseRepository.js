const pool = require("./pool");

async function saveHttpResponse({
  requestPayload,
  responsePayload,
  statusCode,
  responseTimeMs,
  endpoint,
  isAnomaly = false,
  anomalyReason = null,
  rollingMeanMs = null,
  rollingStdDevMs = null,
  predictedResponseTimeMs = null,
  upperBoundMs = null,
  lowerBoundMs = null,
}) {
  const query = `
    INSERT INTO http_responses (
      request_payload,
      response_payload,
      status_code,
      response_time_ms,
      endpoint,
      is_anomaly,
      anomaly_reason,
      rolling_mean_ms,
      rolling_std_dev_ms,
      predicted_response_time_ms,
      upper_bound_ms,
      lower_bound_ms
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *;
  `;

  const values = [
    requestPayload,
    responsePayload,
    statusCode,
    responseTimeMs,
    endpoint,
    isAnomaly,
    anomalyReason,
    rollingMeanMs,
    rollingStdDevMs,
    predictedResponseTimeMs,
    upperBoundMs,
    lowerBoundMs,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

async function getHttpResponses(limit = 50) {
  const result = await pool.query(
    `
    SELECT *
    FROM http_responses
    ORDER BY created_at DESC
    LIMIT $1;
    `,
    [limit],
  );

  return result.rows;
}

async function getRecentResponseTimes(limit = 25) {
  const result = await pool.query(
    `
    SELECT response_time_ms
    FROM http_responses
    ORDER BY created_at DESC
    LIMIT $1;
    `,
    [limit],
  );

  return result.rows.map((row) => row.response_time_ms);
}

async function getResponseTimesFromLast24Hours() {
  const result = await pool.query(`
    SELECT response_time_ms
    FROM http_responses
    WHERE created_at >= NOW() - INTERVAL '24 hours'
    ORDER BY created_at ASC;
  `);

  return result.rows.map((row) => row.response_time_ms);
}

module.exports = {
  saveHttpResponse,
  getHttpResponses,
  getRecentResponseTimes,
  getResponseTimesFromLast24Hours
};
