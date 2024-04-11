const Lead = require("../model/Lead");
createLead = async (req, res) => {
  try {
    const { customerId, customerName, phoneNo } = req.body;
    if (!customerId || !customerName || !phoneNo) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const lead = await Lead.create({ customerId, customerName, phoneNo });
    
    return res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.findAll();
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId, customerName, phoneNo } = req.body;

    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }

    await lead.update({ customerId, customerName, phoneNo });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ error: "Lead not found" });
    }
    await lead.destroy();
    res.json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllLeads,
  createLead,
  getLeadById,
  updateLead,
  deleteLead,
};
