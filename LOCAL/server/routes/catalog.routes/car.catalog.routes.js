const { authJwt, verifyCar } = require("../../middleware");
const controller = require("../../controllers/catalog.controllers/car.catalog.controller");

var express = require('express');
var router = express.Router();


router.route("/")
    .post(
        verifyCar.checkCarDuplicate,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        controller.createCar
    )
    .get(
        controller.getCars
    );


router.route("/:id")
    .put(
        verifyCar.checkCarExisting,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        controller.updateCar
    )
    .delete(
        verifyCar.checkCarExisting,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        verifyCar.checkCarUsage,
        controller.deleteCar
    )
    .get(
        verifyCar.checkCarExisting,
        controller.getCar
    );

module.exports = router;