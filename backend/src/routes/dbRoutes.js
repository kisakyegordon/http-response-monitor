const express = require("express");
const pool = require("../db/pool");

const router = express.Router();

router.get("/health/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as now");

    return res.status(200).json({
      success: true,
      message: "Database is connected",
      time: result.rows[0].now
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});

module.exports = router;