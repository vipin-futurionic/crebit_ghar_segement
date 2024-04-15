const Lead = require("../model/Lead");

const createLead = async ({ customerId, customerName, phoneNo }) => {
  try {
    const lead = await Lead.create({ customerId, customerName, phoneNo });
    return lead;
  } catch (error) {
    throw new Error("Error creating lead");
  }
};

const getAllLeads = async () => {
  try {
    const leads = await Lead.findAll();
    return leads;
  } catch (error) {
    throw new Error("Error fetching leads");
  }
};

const getLeadById = async (id) => {
  try {
    const lead = await Lead.findByPk(id);
    return lead;
  } catch (error) {
    throw new Error("Error fetching lead");
  }
};

const updateLead = async (id, { customerId, customerName, phoneNo }) => {
  try {
    const lead = await Lead.findByPk(id);
    if (!lead) {
      throw new Error("Lead not found");
    }
    await lead.update({ customerId, customerName, phoneNo });
    return lead;
  } catch (error) {
    throw new Error("Error updating lead");
  }
};

const deleteLead = async (id) => {
  try {
    const lead = await Lead.findByPk(id);
    if (!lead) {
      throw new Error("Lead not found");
    }
    await lead.destroy();
    return { message: "Lead deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting lead");
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
