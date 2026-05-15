const express = require("express");
const cors = require("cors");
const dbRoutes = require("./routes/dbRoutes");
const httpResponseRoutes = require("./routes/httpResponseRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend is healthy",
  });
});

app.use("/api", dbRoutes);
app.use("/api", httpResponseRoutes);

module.exports = app;
