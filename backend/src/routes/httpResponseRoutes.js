const express = require("express");
const { listHttpResponses } = require("../controllers/httpResponseController");
const { pingHttpBin } = require("../services/httpMonitorService");
const { broadcastNewResponse } = require("../sockets/socketManager");

const router = express.Router();

router.get("/responses", listHttpResponses);

router.post("/responses/ping", async (req, res) => {
  try {
    const record = await pingHttpBin();
    broadcastNewResponse(record);

    return res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.error("Manual ping failed:", error);

    return res.status(500).json({
      success: false,
      message: "Manual ping failed",
    });
  }
});

module.exports = router;
