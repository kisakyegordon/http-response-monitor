CREATE TABLE IF NOT EXISTS http_responses (
  id SERIAL PRIMARY KEY,
  request_payload JSONB NOT NULL,
  response_payload JSONB NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- For Handling AI/anomaly functionality
  is_anomaly BOOLEAN NOT NULL DEFAULT false,
  anomaly_reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_http_responses_created_at
ON http_responses (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_http_responses_status_code
ON http_responses (status_code);