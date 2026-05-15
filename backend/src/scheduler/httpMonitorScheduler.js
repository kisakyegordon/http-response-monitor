const cron = require("node-cron");
const { pingHttpBin } = require("../services/httpMonitorService");
const { broadcastNewResponse } = require("../sockets/socketManager");

function startHttpMonitorScheduler() {
  const interval = process.env.PING_INTERVAL || "*/5 * * * *";

  cron.schedule(interval, async () => {
    console.log("Running scheduled HTTPBin ping...");

    try {
      const record = await pingHttpBin();
      broadcastNewResponse(record);

      console.log(`Scheduled ping saved: ${record.id}`);
    } catch (error) {
      console.error("Scheduled HTTPBin ping failed:", error);
    }
  });

  console.log(`HTTP monitor scheduler started with interval: ${interval}`);
}

module.exports = startHttpMonitorScheduler;
