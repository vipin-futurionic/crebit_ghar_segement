const db = require("../config/database");
const Segment = require("../model/Segment");
const SegmentData = require("../model/SegmentData");

async function executeQuery(req, res) {
  try {
    const query = req.body.query; // Assuming the query is sent in the request body

    if (!query) {
      throw new Error("Query not provided in the request body.");
    }

    // Check if the provided query is valid
    const queryValidationResult = await validateQuery(query);

    if (!queryValidationResult.isValid) {
      throw new Error("Invalid query: " + queryValidationResult.error);
    }

    // Step 1: Check if the query exists in the Segment table
    let segment = await Segment.findOne({ where: { query: query } });

    if (segment) {
      // If the query exists in the Segment table, increase the refresh counter
      await segment.increment("refreshCounter");
    } else {
      // If the query doesn't exist in the Segment table, insert it with refreshCounter 0
      segment = await Segment.create({
        segmentName: "SegmentName",
        query: query,
        refreshCounter: 0,
      });
    }

    // Step 2: Run the query to get data from the leadTable
    const leadData = await db.query(query, { type: db.QueryTypes.SELECT });

    // Step 3: Process fetched data and store leadId and segmentId for each row
    if (leadData && leadData.length > 0) {
      const segmentId = segment.id;

      // Divide leadData into batches of 5000
      const batchSize = 5000;
      for (let i = 0; i < leadData.length; i += batchSize) {
        const batch = leadData.slice(i, i + batchSize);

        const promises = batch.map(async (lead) => {
          const leadId = lead.id; // Assuming 'id' is the primary key of leadTable
          // Check if the combination of leadId and segmentId already exists in SegmentData table
          const existingData = await SegmentData.findOne({
            where: {
              leadId: leadId,
              segmentId: segmentId,
            },
          });
          if (existingData) {
            // If data already exists, update the refreshCounter
            await existingData.increment("refreshCounter");
          } else {
            // If data doesn't exist, create a new entry
            await SegmentData.create({
              leadId: leadId,
              segmentId: segmentId,
              refreshCounter: segment.refreshCounter,
            });
          }
        });

        // Wait for all promises in the batch to resolve
        await Promise.all(promises);
      }
    } else {
      throw new Error(
        "No data fetched from leadTables for the query: " + query
      );
    }

    res.status(200).json({ message: "Query executed successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
}

// Function to validate the query
async function validateQuery(query) {
  try {
    // Attempt to execute the query to validate it
    await db.query(query, { type: db.QueryTypes.SELECT });
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
}

module.exports = {
  executeQuery,
};
