const Sequelize = require("sequelize");
const db = require("../config/database");

const SegmentData = db.define("segmentDatas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  leadId: {
    type: Sequelize.INTEGER,
  },
  segmentId: Sequelize.INTEGER,
  refreshCounter: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});
module.exports = SegmentData;
