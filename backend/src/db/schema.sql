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
  anomaly_reason TEXT,

  rolling_mean_ms INTEGER,
  rolling_std_dev_ms INTEGER,
  predicted_response_time_ms INTEGER,
  upper_bound_ms INTEGER,
  lower_bound_ms INTEGER
);

ALTER TABLE http_responses
ADD COLUMN IF NOT EXISTS rolling_mean_ms INTEGER,
ADD COLUMN IF NOT EXISTS rolling_std_dev_ms INTEGER,
ADD COLUMN IF NOT EXISTS predicted_response_time_ms INTEGER,
ADD COLUMN IF NOT EXISTS upper_bound_ms INTEGER,
ADD COLUMN IF NOT EXISTS lower_bound_ms INTEGER;

CREATE INDEX IF NOT EXISTS idx_http_responses_created_at
ON http_responses (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_http_responses_status_code
ON http_responses (status_code);

CREATE INDEX IF NOT EXISTS idx_http_responses_is_anomaly
ON http_responses (is_anomaly);