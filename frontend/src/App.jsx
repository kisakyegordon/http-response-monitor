import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkBackendHealth() {
      try {
        const response = await axios.get(`${API_URL}/health`);
        setHealth(response.data);
      } catch (err) {
        setError("Unable to connect to backend");
      }
    }

    checkBackendHealth();
  }, []);

  return (
    <main className="app-shell">
      <section className="hero">
        <h1>HTTP Response Monitor</h1>
        <p>
          A real-time dashboard for monitoring scheduled HTTP responses from
          httpbin.org.
        </p>
      </section>

      <section className="card">
        <h2>Backend Status</h2>

        {health && <p className="success">✅ {health.message}</p>}

        {error && <p className="error">❌ {error}</p>}

        {!health && !error && <p>Checking backend...</p>}
      </section>
    </main>
  );
}

export default App;
