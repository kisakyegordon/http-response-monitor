const pool = require("./pool");

async function saveHttpResponse({
  requestPayload,
  responsePayload,
  statusCode,
  responseTimeMs,
  endpoint,
}) {
  const query = `
    INSERT INTO http_responses (
      request_payload,
      response_payload,
      status_code,
      response_time_ms,
      endpoint,
      is_anomaly,
      anomaly_reason
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
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

module.exports = {
  saveHttpResponse,
  getHttpResponses,
  getRecentResponseTimes,
};
