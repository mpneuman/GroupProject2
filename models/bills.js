module.exports = function (sequelize, Sequelize) {
  var Bills = sequelize.define("Bills", {


    payee: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    amountDue: {
      type: Sequelize.DECIMAL(10, 2),
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
    // ,
    // user_id: {
    //   type: Sequelize.UUID,
    //   allowNull: false
    // }

  });
  Bills.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Bills.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bills

}
