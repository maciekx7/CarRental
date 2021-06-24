const authJwt = require("./authJwt");
const verifySingUp = require("./verifySingUp")
const verifyMake = require("./catalog.middleware/make.catalog.middleware");
const verifyCarModel = require("./catalog.middleware/carModel.catalog.middleware");
const verifyCar = require("./catalog.middleware/car.catalog.middleware");
const verifyTransaction = require("./transaction.middleware");
const verifyAuth = require("./verifyAuth")

module.exports = {
    authJwt,
    verifySingUp,
    verifyMake,
    verifyCarModel, 
    verifyCar,
    verifyTransaction,
    verifyAuth
}