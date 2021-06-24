const { authJwt, verifyCarModel } = require("../../middleware");
const controller = require("../../controllers/catalog.controllers/carModel.catalog.controller");

var express = require('express');
var router = express.Router();

    router.route("/")
    .post(
        verifyCarModel.checkCarModelDuplicate,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        verifyCarModel.chechModelNotNull,
        controller.createModel
    )
    .get(
        controller.getAllModels
    );

    router.route("/:id")
    .put(
        verifyCarModel.checkCarModelDuplicate,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        controller.updateModel
    )
    .delete(
        verifyCarModel.chechCarModelExisting,
        authJwt.verifyToken,
        authJwt.verifyAdmin,
        verifyCarModel.checkModelUsage,
        controller.deleteModel
    )
    .get(
        verifyCarModel.chechCarModelExisting,
        controller.getModel
    );

    

    module.exports = router;