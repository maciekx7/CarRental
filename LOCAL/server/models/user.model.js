var bycrypt = require("bcryptjs");
var roles = require("../config/models.config/user.roles.config");
/**
 * User class representing User in application and Users table
 */
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        name: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
        role: {
            type: Sequelize.STRING(5),
            allowNull: false,
            defaultValue: roles.USER,
            enum: [roles.ADMIN, roles.USER]
        }
    },
    {
        tableName: 'Users',
        hooks: {
            beforeCreate: (user) => {
                user.password = bycrypt.hashSync(user.password, 8);
            }
        }
    });

    User.prototype.validPassword =  function(password) {
        return bycrypt.compareSync(password, this.password);
    }

    User.createNewHash = function(password) {
        return bycrypt.hashSync(password, 8);
    }
    
    return User;
};