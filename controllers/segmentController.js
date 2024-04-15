const segmentService = require("../services/segementServices");

async function executeQuery(req, res) {
  try {
    // Call the executeQuery function from the segment service
    await segmentService.executeQuery(req, res);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  executeQuery,
};
