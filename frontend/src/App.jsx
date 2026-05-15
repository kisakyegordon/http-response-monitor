import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

function App() {
  const [health, setHealth] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchResponses() {
    try {
      setLoading(true);
      const result = await axios.get(`${API_URL}/api/responses?limit=50`);
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
      await axios.post(`${API_URL}/api/responses/ping`);
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

      {error && <div className="alert error">{error}</div>}

      <section className="card">
        <div className="card-header">
          <h2>Response History</h2>
          <span>{responses.length} records</span>
        </div>

        {loading ? (
          <p>Loading responses...</p>
        ) : responses.length === 0 ? (
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
                {responses.map((response) => (
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
