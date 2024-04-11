const sequelize = require("sequelize");
const db = require("../config/database");

const leadTable = db.define("leadTable", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: sequelize.INTEGER,
  customerName: sequelize.STRING,
  phoneNo: sequelize.STRING,
  createdDate: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
  updatedDate: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
  },
});

module.exports = leadTable;
