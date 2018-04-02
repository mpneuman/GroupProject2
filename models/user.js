var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

var Users = sequelize.define("user", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  first_name: {
    type: Sequelize.STRING,
    notEmpty: true
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.INTEGER
  },
  lastLogin: {
      type: Sequelize.DATE
  }
});

Users.sync();

module.export = Users;
