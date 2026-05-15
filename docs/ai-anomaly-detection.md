# Anomaly Detection

The system includes a lightweight statistical anomaly detection layer for HTTP response latency.

## Approach

For each new response, the backend looks at response times from the last 24 hours and calculates:

- rolling mean
- standard deviation
- upper bound
- lower bound
- predicted next response time

## Detection Rule

A response is marked anomalous when:

```text
response_time_ms > rolling_mean + 2 * standard_deviation


Forecasting

The predicted next response time is calculated using a simple moving average of the last 5 response times.

Visualization

The dashboard visualizes:

- actual latency
- rolling average
- predicted response time
- upper bound
- anomaly markers


Tradeoffs

This approach is simple, explainable, and efficient. It is not a machine learning model, but it works well for small-scale monitoring.