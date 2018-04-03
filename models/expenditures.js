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
        type: Sequelize.DECIMAL(10,2),
        acceptNull: false
      },
      category: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      }
    });

    Expenditures.associate = function(models) {
        Expenditures.belongsTo(models.Users);
        };
    return Expenditures;
    
    };
