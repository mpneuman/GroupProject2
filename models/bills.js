module.exports = function (sequelize, Sequelize) {
    var Bills = sequelize.define("bill", {
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
        type: Sequelize.FLOAT,
        acceptNull: false
      },
      category: {
        type: Sequelize.STRING
      },
      date_due: {
        type: Sequelize.DATE
      },
      website_access: {
          type: Sequelize.STRING
      },
      notes: {
          type: Sequelize.STRING
      }
    });
    return Bills
    
    }
