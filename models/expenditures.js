module.exports = function (sequelize, Sequelize) {
    var Expenditures = sequelize.define("Expenditures", {
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

    Expenditures.associate = function (models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Expenditures.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Expenditures;
    
    };
