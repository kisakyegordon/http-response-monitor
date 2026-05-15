const { getHttpResponses } = require("../db/httpResponseRepository");

async function listHttpResponses(req, res) {
  try {
    const limit = Number(req.query.limit) || 50;
    const responses = await getHttpResponses(limit);

    return res.status(200).json({
      success: true,
      data: responses,
    });
  } catch (error) {
    console.error("Failed to fetch HTTP responses:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch HTTP responses",
    });
  }
}

module.exports = { listHttpResponses };
