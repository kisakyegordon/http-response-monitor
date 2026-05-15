import { useEffect, useState } from "react";
import apiClient from "./api/client";
import { io } from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

function App() {
  const [health, setHealth] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  async function fetchResponses() {
    try {
      console.log("API_URL", import.meta.env.VITE_API_URL);
      console.log("SOCKET_URL", import.meta.env.VITE_SOCKET_URL);
      
      setLoading(true);
      const result = await apiClient.get(`${API_URL}/api/responses?limit=50`);
      setResponses(result.data.data || []);
      setError("");
    } catch (error) {
      setError("Unable to load response history");
    } finally {
      setLoading(false);
    }
  }

  async function triggerManualPing() {
    try {
      await apiClient.post(`${API_URL}/api/responses/ping`);
    } catch (error) {
      setError("Manual ping failed");
    }
  }

  useEffect(() => {
    fetchResponses();

    const socket = io(SOCKET_URL);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("new-http-response", (newResponse) => {
      setResponses((current) => [newResponse, ...current].slice(0, 50));
    });

    socket.on("connect_error", () => {
      setError("Realtime connection failed");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Advanced Metrics

  const totalRecords = responses.length;

  const averageLatency =
    responses.length === 0
      ? 0
      : Math.round(
          responses.reduce((sum, item) => sum + item.response_time_ms, 0) /
            responses.length,
        );

  const latestLatency =
    responses.length > 0 ? responses[0].response_time_ms : 0;

  const anomalyCount = responses.filter((item) => item.is_anomaly).length;

  const chartData = [...responses].reverse().map((item) => ({
    time: new Date(item.created_at).toLocaleTimeString(),
    latency: item.response_time_ms,
  }));

  const filteredResponses = responses.filter((response) => {
    if (filter === "success") return response.status_code < 400;
    if (filter === "error") return response.status_code >= 400;
    if (filter === "anomaly") return response.is_anomaly;
    return true;
  });

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <h1>HTTP Response Monitor</h1>
          <p>Live monitoring dashboard for scheduled HTTPBin responses.</p>
        </div>

        <button onClick={triggerManualPing}>Run Manual Ping</button>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>Total Records</span>
          <strong>{totalRecords}</strong>
        </div>

        <div className="stat-card">
          <span>Average Latency</span>
          <strong>{averageLatency} ms</strong>
        </div>

        <div className="stat-card">
          <span>Latest Latency</span>
          <strong>{latestLatency} ms</strong>
        </div>

        <div className="stat-card">
          <span>Anomalies</span>
          <strong>{anomalyCount}</strong>
        </div>
      </section>

      <section className="card chart-card">
        <div className="card-header">
          <h2>Latency Trend</h2>
          <span>Response time over recent checks</span>
        </div>

        {chartData.length === 0 ? (
          <p>No chart data available yet.</p>
        ) : (
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="latency"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {error && <div className="alert error">{error}</div>}

      <section className="card">
        <div className="card-header">
          <h2>Response History</h2>
          <span>{responses.length} records</span>
        </div>

        <div className="filters">
          <button
            className={filter === "all" ? "active-filter" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={filter === "success" ? "active-filter" : ""}
            onClick={() => setFilter("success")}
          >
            Success
          </button>

          <button
            className={filter === "error" ? "active-filter" : ""}
            onClick={() => setFilter("error")}
          >
            Errors
          </button>

          <button
            className={filter === "anomaly" ? "active-filter" : ""}
            onClick={() => setFilter("anomaly")}
          >
            Anomalies
          </button>
        </div>

        {loading ? (
          <p>Loading responses...</p>
        ) : filteredResponses.length === 0 ? (
          <p>No responses recorded yet. Run a manual ping to create one.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Latency</th>
                  <th>Anomaly</th>
                  <th>Endpoint</th>
                  <th>Request ID</th>
                </tr>
              </thead>

              <tbody>
                {filteredResponses.map((response) => (
                  <tr key={response.id}>
                    <td>{new Date(response.created_at).toLocaleString()}</td>
                    <td>
                      <span
                        className={
                          response.status_code >= 400
                            ? "badge danger"
                            : "badge success"
                        }
                      >
                        {response.status_code}
                      </span>
                    </td>
                    <td>{response.response_time_ms} ms</td>
                    <td>
                      {response.is_anomaly ? (
                        <span className="badge danger">Anomaly</span>
                      ) : (
                        <span className="badge success">Normal</span>
                      )}
                      {response.anomaly_reason && (
                        <div className="muted">{response.anomaly_reason}</div>
                      )}
                    </td>
                    <td>{response.endpoint}</td>
                    <td>{response.request_payload?.requestId || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
