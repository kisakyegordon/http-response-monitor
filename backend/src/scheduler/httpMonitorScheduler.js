const cron = require("node-cron");
const logger = require("../utils/logger");
const { pingHttpBin } = require("../services/httpMonitorService");
const { broadcastNewResponse } = require("../sockets/socketManager");

function startHttpMonitorScheduler() {
  const interval = process.env.PING_INTERVAL || "*/5 * * * *";

  cron.schedule(interval, async () => {
    logger.info("Running scheduled HTTPBin ping");

    try {
      const record = await pingHttpBin();
      broadcastNewResponse(record);

      logger.info("Scheduled ping saved", { responseId: record.id });
    } catch (error) {
      logger.error("Scheduled HTTPBin ping failed", {
        error: error.message,
      });
    }
  });

  logger.info("HTTP monitor scheduler started with interval: ", { interval });
}

module.exports = startHttpMonitorScheduler;
