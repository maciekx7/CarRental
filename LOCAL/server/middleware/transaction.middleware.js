const { user } = require("../models");
const db = require("../models");
const User = db.user;
const verifyCar = require("./catalog.middleware/car.catalog.middleware");
const Transaction = db.transaction;
const roles = require("../config/models.config/user.roles.config");

checkExisting = (req, res, next) => {
    Transaction.findByPk(req.params.id)
        .then(transaction => {
            if(!transaction) {
                return res.status(404).send({
                    message: "Transaction not found!"
                });
            }
            next();
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

checkAccess = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const transaction = await Transaction.findByPk(req.params.transactionID);
        if( user.role == roles.ADMIN || transaction.UserId == req.userId) {
            next();
        } else {
            return res.status(403).send({
                message: "Access denied!"
            });
        }
    } catch(error) {
        return res.status(500).send({
            message: error.message
        })
    }
    
}


const verifyTransaction = {
    checkExisting: checkExisting,
    checkAccess: checkAccess
}

module.exports = verifyTransaction;