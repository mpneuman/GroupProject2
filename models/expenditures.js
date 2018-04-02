module.exports = function (sequelize, Sequelize) {
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
      amount_paid: {
        type: Sequelize.FLOAT,
        acceptNull: false
      },
      category: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      }
    });
    return Expenditures
    
    }
