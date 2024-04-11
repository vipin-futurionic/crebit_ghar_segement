const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadcontroller");

router.get("/", leadController.getAllLeads);
router.post("/", leadController.createLead);
router.get("/:id", leadController.getLeadById);
router.put("/:id", leadController.updateLead);
router.delete("/:id", leadController.deleteLead);

module.exports = router;
