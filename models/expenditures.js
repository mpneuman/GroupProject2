var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

var Expenditures = sequelize.define("expenditure", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  payee: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  amount_due: {
    type: Sequelize.FLOAT
  },
  category: {
    type: Sequelize.STRING
  },
  notes: {
    type: Sequelize.STRING
  }
});

Users.sync();

module.export = Users;
