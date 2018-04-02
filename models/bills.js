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
      amountDue: {
        type: Sequelize.DECIMAL(10,2),
        acceptNull: false
      },
      category: {
        type: Sequelize.STRING
      },
      dateDue: {
        type: Sequelize.DATE
      },
      websiteAccess: {
          type: Sequelize.STRING
      },
      notes: {
          type: Sequelize.STRING
      }
    });
    return Bills
    
    }
