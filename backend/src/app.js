const express = require("express");
const cors = require("cors");
const dbRoutes = require("./routes/dbRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Backend is healthy",
  });
});

app.use("/api", dbRoutes);

module.exports = app;
