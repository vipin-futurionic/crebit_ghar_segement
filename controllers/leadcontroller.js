const leadService = require("../services/leadServices");

const createLead = async (req, res) => {
  try {
    const { customerId, customerName, phoneNo } = req.body;
    if (!customerId || !customerName || !phoneNo) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const lead = await leadService.createLead({
      customerId,
      customerName,
      phoneNo,
    });
    return res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const leads = await leadService.getAllLeads();
    return res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await leadService.getLeadById(id);
    return res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, customerName, phoneNo } = req.body;
    const lead = await leadService.updateLead(id, {
      customerId,
      customerName,
      phoneNo,
    });
    return res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await leadService.deleteLead(id);
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
