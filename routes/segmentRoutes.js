const express = require("express");
const router = express.Router();

const segmentController = require("../controllers/segmentController");

router.post("/", segmentController.executeQuery);

module.exports = router;
