module.exports = function (sequelize, Sequelize) {
    var Users = sequelize.define('Users', {

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

        Users.hasMany(models.Bills, {
            onDelete: "cascade"
        });
    };


    return Users;
}