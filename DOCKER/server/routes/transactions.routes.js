const { authJwt, verifyCar, verifyTransaction } = require("../middleware");
const controller = require("../controllers/transactions.controller");

var express = require('express');
var router = express.Router();

router.use(
    authJwt.verifyToken,
    function (req, res, next) {
        next();
    })

router.route("/")
    .post(
        (req, res, next) => {
            req.params.id = req.body.CarId;
            next();
        },
        verifyCar.checkCarExisting,
        controller.createTransaction
    );

router.route("/:id")
    .put(
        authJwt.verifyAdmin,
        verifyTransaction.checkExisting,
        controller.closeTransaction
    );

router.route("/all")
    .get(
        authJwt.verifyAdmin,
        controller.getAllTransactions
    );

router.route("/")
    .get(
        controller.getUserTransactions
    ),

router.route("/:transactionID")
    .get(
        verifyTransaction.checkAccess,
        controller.getTransaction
    )



module.exports = router;