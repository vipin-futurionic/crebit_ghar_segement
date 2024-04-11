// models/leadTable.js
const Sequelize = require("sequelize");
const db = require("../config/database");

const Segment = db.define("segments", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  segmentName: Sequelize.STRING,
  query: Sequelize.STRING,
  refreshCounter: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Segment;
