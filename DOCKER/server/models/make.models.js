

module.exports = (sequelize, Sequelize) => {
    const Make = sequelize.define("Make", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        tableName: "Makes"
    });

    return Make;
}