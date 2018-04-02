// var Sequelize = require("sequelize");
// // sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");
module.exports = function (sequelize, Sequelize) {
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
    type: Sequelize.STRING
  },
  lastLogin: {
      type: Sequelize.DATE
  }
});
return Users

}



