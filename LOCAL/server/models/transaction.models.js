module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("Transaction", {
        cost: {
            type: Sequelize.INTEGER
        },
        rentDate: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        returnDate: {
            type: Sequelize.DATEONLY,
            allowNull: true
        }
    },
    {
        tableName: "Transactions"
    });

    return Transaction;
}