module.exports = function (sequelize, Sequelize) {
    var Users = sequelize.define('Users', {

        // id: {
        //     type: Sequelize.UUID,
        //     autoIncrement: true,
        //     primaryKey: true
            
        // },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Users.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Users.hasMany(models.Bills, {
            // foreignKey: user_id,

            onDelete: "cascade"
        });
    };


    return Users;
}